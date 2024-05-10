import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import React, { useEffect, useReducer, useState } from "react";
// import { Routes, Route } from "react-router-dom";

import MainPage from "./components/main-page/MainPage";
import SignUp from "./components/signup/SignUp2";
import LogIn from "./components/login/LogIn2";
import Left from "./components/left/Left";
import { Routes, Route, useNavigate } from "react-router-dom";


import NotFound from "./common/NotFound";
import LoadingIndicator from "./common/LoadingIndicator";
import { getCurrentUser, login } from "./util/APIUtils";
import { ACCESS_TOKEN, USER_EMAIL, USER_NAME } from "./constants";
import PrivateRoute from "./common/PrivateRoute";

import { ToastContainer, toast } from "react-toastify";
import WorkourPlanPage from "./components/workour-plan-page/WorkourPlanPage";
import WorkourStatusPage from "./components/workour-status-page/WorkourStatusPage";
import MealPlanPage from "./components/meal-plan-page/MealPlanPage";
import LogIn2 from "./components/login/LogIn2";
import SignUp2 from "./components/signup/SignUp2";

function App() {
  const navigate = useNavigate();
  // const [state, setState] = useReducer(
  //   (prevState, newState) => {
  //     return { ...prevState, ...newState };
  //   },
  //   {
  //     authenticated: true,
  //     currentUser: null,
  //     loading: true,
  //   }
  // );
  const [authenticated, setAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCurrentlyLoggedInUser = () => {
    console.log("load current user")
    getCurrentUser()
      .then((response) => {
        // setState({
        //   currentUser: response.name,
        //   authenticated: true,
        //   loading: false,
        // });
        setCurrentUser(response.name);
        setAuthenticated(true);
        setLoading(false);
        console.log("load current auth: "+authenticated)
      })
      .catch((error) => {
        console.log("load current user error!")
        // setState({
        //   loading: false,
        // });
        setLoading(false);
      });
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    debugger;
    console.log("App component handle logout is triggered")
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_NAME);
    // setState({
    //   authenticated: false,
    //   currentUser: null,
    // });
    setAuthenticated(false);
    setCurrentUser(null);
    console.log("Log out auth: "+ authenticated)
    toast("You're safely logged out!", {
      type: "success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/");
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={<PrivateRoute authenticated={authenticated} onLogout={handleLogout} component={MainPage} />}
        />
        <Route
          path="/workoutplan"
          element={<PrivateRoute authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} component={WorkourPlanPage} />}
        />
        <Route
          path="/workoutstatus"
          element={<PrivateRoute authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} component={WorkourStatusPage} />}
        />
        <Route
          path="/mealplan"
          element={<PrivateRoute authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} component={MealPlanPage} />}
        />
        <Route
          path="/"
          element={<LogIn2 authenticated={authenticated} onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUp2 authenticated={authenticated} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
