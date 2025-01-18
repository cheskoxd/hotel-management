import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
// import Login from './pages/Login';
import Admin from './pages/Admin';

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
