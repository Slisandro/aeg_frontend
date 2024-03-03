import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/private-routes-component';
import ConstanciesHakTek from './pages/constancies-haktek-page';
import Constancies from './pages/constancies-pages';
import Courses from './pages/courses-pages';
import Login from "./pages/login-pages";
import SearchConstancies from './pages/search-constancies-pages';
import Users from './pages/users-pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/panel/constancies" element={<Constancies />} />
            <Route path="/panel/courses" element={<Courses />} />
            <Route path="/panel/users" element={<Users />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/haktek/constancies" element={<ConstanciesHakTek />} />
            {/* <Route path="/haktek/courses" element={<Courses />} />
            <Route path="/haktek/users" element={<Users />} /> */}
          </Route>
          <Route path="/search-constancies" element={<SearchConstancies />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
