import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Crud from './pages/Crud';
import Todos from './pages/Todos';
import Update from './pages/Update';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/crud' element={<Crud />} />
        <Route path='/update' element={<Update />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/createAccount' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
