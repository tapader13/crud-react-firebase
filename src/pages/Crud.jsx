import React, { useEffect, useState } from 'react';
import { UseFireBase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Crud() {
  const user = UseFireBase();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    if (!user.isLogged) {
      navigate('/');
    }
  }, []);
  const handleSub = (e) => {
    e.preventDefault();
    if (user.isLogged) {
      user.addData(date, title, desc);
      setDate('');
      setTitle('');
      setDesc('');
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
          ADD
        </Button>
      </Form>
    </div>
  );
}

export default Crud;
