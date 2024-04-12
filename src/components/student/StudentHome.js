import { InitialStateContext } from "../../reducers/questionReducer";
import { useContext } from "react";
import { Link } from "react-router-dom";
function StudentHome({ AnswerState }) {
  const { state } = useContext(InitialStateContext);
  const Time = state.testDetails.testTime;
  var score = 0;
  if (Object.keys(AnswerState.answers).length > 0) {
    for (var i = 0; i < state.questions.length; i++) {
      if (AnswerState.answers[i] === state.questions[i].correctAnswer) {
        score++;
      }
    }
  }

  return (
    <>
      {state.testCreated ? (
        state.testSubmit ? (
          <div className="row mt-3 d-flex justify-content-around bg-warning-subtle p-3">
            <div className="text-center">
              <h3>Submited Tests</h3>
            </div>
            <div className="col-md-4 p-3 bg-white ">
              <h5>
                <span className="pe-3">Test Name:</span>
                <span>{state.testDetails.testName}</span>
              </h5>
              <p>
                <span className="pe-3">Test Duration:</span>
                <span className="pe-3">{Time.substring(0, 2) + " "}hours</span>
                <span>{Time.substring(3, Time.length) + " "}minutes</span>
              </p>
              <h3>Score:{score}</h3>
            </div>
          </div>
        ) : (
          <div className="row mt-3 d-flex justify-content-around bg-warning-subtle p-3">
            <div className="text-center">
              <h3>Available Tests</h3>
            </div>
            <div className="col-md-4 p-3 bg-white ">
              <h5>
                <span className="pe-3">Test Name:</span>
                <span>{state.testDetails.testName}</span>
              </h5>
              <p>
                <span className="pe-3">Test Duration:</span>
                <span className="pe-3">{Time.substring(0, 2) + " "}hours</span>
                <span>{Time.substring(3, Time.length) + " "}minutes</span>
              </p>
              <button className="btn btn-warning">
                <Link
                  to={"/studentdashboard/starttest"}
                  className="text-decoration-none"
                >
                  Start Test
                </Link>
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="row mt-3 d-flex justify-content-around bg-warning-subtle p-3">
          <div className="text-center">
            <h3>No Tests Available</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentHome;
