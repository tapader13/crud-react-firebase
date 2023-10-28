import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './navbar.module.css';
import { UseFireBase } from '../Firebase';
import './navvar.css';
function Navbar() {
  const user = UseFireBase();
  const navigate = useNavigate();

  return (
    <>
      <nav className={style.container}>
        <NavLink className={style.NavLink} to={'/'}>
          Home
        </NavLink>
        <NavLink className={style.NavLink} to={'/crud'}>
          Add Todo
        </NavLink>
        <NavLink className={style.NavLink} to={'/todos'}>
          Todos List
        </NavLink>
        {user.isLogged ? ( // Check if the user is logged in
          <NavLink
            style={{ color: 'white' }}
            onClick={() => {
              user.logout();
            }}
            className={style.NavLink}
          >
            LogOut
          </NavLink>
        ) : null}
      </nav>
    </>
  );
}

export default Navbar;
