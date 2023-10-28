import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UseFireBase } from '../Firebase';
import Crud from '../pages/Crud';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = UseFireBase();
  const navigate = useNavigate();
  const handleSub = (e) => {
    e.preventDefault();
    user
      .crateUser(email, password)
      .then((res) => {
        navigate('/crud');
      })
      .catch((err) => {
        alert('give valid data');
      });
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <div className='container'>
        <Form
          onSubmit={handleSub}
          style={{
            maxWidth: '500px',
            textAlign: 'center',
            margin: 'auto',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            marginBlock: '3rem',
            padding: '2rem',
          }}
        >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ fontSize: '1.2rem', fontWeight: '900' }}>
              Email address
            </Form.Label>
            <Form.Control
              style={{ textAlign: 'center' }}
              type='email'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='Enter Your email.....'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label style={{ fontSize: '1.2rem', fontWeight: '900' }}>
              Password
            </Form.Label>
            <Form.Control
              style={{ textAlign: 'center' }}
              type='password'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder='Enter Your Password.....'
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Create Account
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
