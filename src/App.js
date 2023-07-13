import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Link from "@material-ui/core/Link";

import "./App.css";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import News from "./components/news/news.component";

import { logout, setLoggedIn } from "./redux/action/auth.action";
import { clearMessage } from "./redux/action/message.action";
import { getTokenFromLocalStorage } from "./services/auth.service";
import ArticleDetail from "./components/news-detail/articleDetail.component";
import SearchNews from "./components/search/search.component";
import { setHistorySearched } from "./utils/util";

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
    // if (!isLoggedIn && "/register" !== location.pathname) navigate('/login');
  }, [isLoggedIn]);

  const logOut = useCallback(() => {
    dispatch(logout());
    setHistorySearched([]);
  }, [dispatch]);

  return (
    <div>
      <nav className="menu">
        {isLoggedIn ? (
          <>
            <Link to={"/news"} component={RouterLink} className="nav-link">
              News
            </Link>

            <Link to={"/search"} component={RouterLink} className="nav-link">
              Search News
            </Link>

            <Link to={"/login"} component={RouterLink} className="nav-link" onClick={logOut}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"} component={RouterLink} className="nav-link">
              Login
            </Link>

            <Link to={"/register"} component={RouterLink} className="nav-link">
              Sign Up
            </Link>
          </>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/news" element={<News />} />
          <Route path="/article" element={<ArticleDetail />} />
          <Route path="/search" element={<SearchNews />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;