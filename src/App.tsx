import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/private-routes-component';
import Dashboard from './pages/dashboard-pages';
import Login from "./pages/login-pages";
import Users from './pages/users-pages';
import Constancies from './pages/constancies-pages';
import Courses from './pages/courses-pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/panel" element={<Dashboard />} />
            <Route path="/panel/constancies" element={<Constancies />} />
            <Route path="/panel/courses" element={<Courses />} />
            <Route path="/panel/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
