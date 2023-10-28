import React, { useEffect, useState } from 'react';
import { UseFireBase } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Todos() {
  const users = UseFireBase();
  const navigate = useNavigate();
  //   const [title, setTitle] = useState('');
  //   const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!users.isLogged) {
        navigate('/');
      } else {
        if (users.user) {
          try {
            const data = await users.getData(users.user.email);
            setData(data.docs);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    fetchData();
  }, []);
  const dltHandle = (id) => {
    users.deleteData(id);
    const filt = data.filter((d) => d.id !== id);
    setData(filt);
  };
  return (
    <div className='container'>
      {data.map((dta, i) => {
        const result = dta.data();
        {
          /* console.log(result.id); */
        }
        return (
          <section
            style={{
              backgroundColor: 'lightgray',
              marginBlock: '1rem',
              padding: '1rem',
              borderRadius: '15px',
            }}
            key={i}
          >
            <h3>Title: {result.title}</h3>
            <h4>Description: {result.desc}</h4>
            <h5>Date: {result.date}</h5>
            <div>
              <Button
                style={{ marginInline: '1rem' }}
                onClick={() => {
                  dltHandle(dta.id);
                }}
              >
                Delete
              </Button>
              <Link
                to={'/update'}
                state={{
                  title: result.title,
                  desc: result.desc,
                  date: result.date,
                  id: dta.id,
                }}
              >
                <Button style={{ marginInline: '1rem' }}>Edit</Button>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Todos;
