// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './ComponentsRegister/Register.js';
import Login from './ComponentsLogin/Login.js';
import FrontPage from './FrontPageComponents/FrontPage.js';
import AdminDashbord from './AdminDashbordComponents/AdminDashbord.js';
import store from './store';
import { Provider } from 'react-redux';
import PrivateRouteWrapper from './PrivateRouteWrapper';
function App() {
    const frontPageAuthCheck = () => {
        if(localStorage.getItem("userId")!==null){
            return true;
        }else{
            return false;
        }
    };
    const adminAuthCheck = () => {
        if(localStorage.getItem("admin")==="1"){
            return true;
        }
        else{
            return false;
        }
    };
    return (
      <Provider store={store}>
        <Router>
        <Routes>
  <Route path="/" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/frontpage" element={<PrivateRouteWrapper authCheck={frontPageAuthCheck} element={FrontPage} />} />
  <Route path="/admin" element={<PrivateRouteWrapper authCheck={adminAuthCheck} element={AdminDashbord} />} />
</Routes>
        </Router>
        </Provider>
    );
}

export default App;