import React, { useState, useEffect, useContext } from "react";
import { InitialStateContext } from "../../reducers/questionReducer";
import { useNavigate } from "react-router-dom";

function TestTimer({ duration, onTimerComplete }) {
  const { state, dispatch } = useContext(InitialStateContext);
  const navigate = useNavigate();

  const [secondsLeft, setSecondsLeft] = useState(duration * 60);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timeoutId = setTimeout(() => {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      onTimerComplete();
      {
        dispatch({ type: "testSubmit" });

        setTimeout(() => {
          navigate("/studentdashboard");
        }, 1000);
      }
    }
  }, [secondsLeft, duration, onTimerComplete]);

  var minutes = Math.floor(secondsLeft / 60);
  const houres = Math.floor(minutes / 60);
  minutes = minutes % 60;
  const seconds = secondsLeft % 60;

  return (
    <>
      <h5 className="col-2">Test Timer:</h5>

      <span className=" col-2 bg-white p-2 ms-1">{`${houres
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}</span>
    </>
  );
}

export default TestTimer;
