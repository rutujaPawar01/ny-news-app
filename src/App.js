import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import Login from "../components/Login";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import News from "./components/news/news.component";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

import { logout, setLoggedIn } from "./redux/action/auth.action";
import { clearMessage } from "./redux/action/message.action";
import { addTokenToLocalStorage, getTokenFromLocalStorage, refreshToken } from "./services/auth.service";
import ArticleDetail from "./components/news-detail/articleDetail.component";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token?.length > 0) {
      dispatch(setLoggedIn());
    } else {
      dispatch(logout());
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn && "/register" !== location.pathname) navigate('/login');
  }, [isLoggedIn]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/news"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {isLoggedIn ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article" element={<ArticleDetail />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/user" element={<BoardUser />} /> */}
          {/* <Route path="/mod" element={<BoardModerator />} /> */}
          {/* <Route path="/admin" element={<BoardAdmin />} /> */}
        </Routes>
      </div>

    </div>
  );
};

export default App;