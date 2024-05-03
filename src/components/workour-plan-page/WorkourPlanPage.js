import React, { useEffect, useReducer, useState } from "react";
import MiddleWorkoutPlan from "../middleworkoutplan/MiddleWorkoutPlan";
import Left from "../left/Left";
import Right from "../right/Right";
import Header from "../header/Header";
import "./WorkourPlanPage.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllWorkoutPlans } from "../../util/APIUtils";
import WorkoutPlanForm from "../right-workout-plan-form/WorkoutPlanForm";
import { getCurrentUser } from "../../util/APIUtils";
import { ACCESS_TOKEN, USER_EMAIL, USER_NAME } from "../../constants";
import LoadingIndicator from "../../common/LoadingIndicator";


export default function WorkourPlanPage() {
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      authenticated: true,
      currentUser: null,
      loading: true,
    }
  );

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then((response) => {
        setState({
          currentUser: response,
          authenticated: false,
          loading: false,
        });
      })
      .catch((error) => {
        setState({
          loading: false,
        });
      });
  };


  const handleLogout = () => {
    console.log("Handle logout is triggered")
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_NAME);
    setState({
      authenticated: false,
      currentUser: null,
    });
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
    // navigate("/login");
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  if (state.loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Header authenticated={state.authenticated} onLogout={handleLogout} />
      <main>
        <div className="container">
          <Left />
          <MiddleWorkoutPlan/>
          <WorkoutPlanForm />
        </div>
      </main>
    </div>
  );
}
