import React, { useEffect, useState } from 'react';
import { UseFireBase } from '../Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Update() {
  const user = UseFireBase();
  const navigate = useNavigate();
  const location = useLocation();
  //   console.log(location);
  const [title, setTitle] = useState(location.state.title);
  const [desc, setDesc] = useState(location.state.desc);
  const [date, setDate] = useState(location.state.date);
  useEffect(() => {
    if (!user.isLogged) {
      navigate('/');
    }
  }, []);
  const handleSub = (e) => {
    e.preventDefault();
    if (user.isLogged) {
      user.editData(date, title, desc, location.state.id);
      setDate('');
      setTitle('');
      setDesc('');
      alert('Update Done');
      navigate('/todos');
    } else {
      navigate('/');
    }
  };
  return (
    <div className='container'>
      <Form onSubmit={handleSub}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type='date'
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as='textarea'
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
          />
        </Form.Group>
        <Button type='submit' variant='success'>
          UPDATE
        </Button>
      </Form>
    </div>
  );
}

export default Update;
