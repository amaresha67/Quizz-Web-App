import { InitialStateContext } from "../../reducers/questionReducer";
import { useContext } from "react";
import { Link } from "react-router-dom";

function StudentHome({ AnswerState }) {
  const { state, dispatch } = useContext(InitialStateContext);

  let tests = state.tests;
  var score = 0;
  if (Object.keys(AnswerState.answers).length > 0) {
    for (
      var i = 0;
      i < state.tests[state.presentTestIndex].questions.length;
      i++
    ) {
      if (
        AnswerState.answers[i] ===
        state.tests[state.presentTestIndex].questions[i].correctAnswer
      ) {
        score++;
      }
    }

    dispatch({ type: "scoreUpdate", score: score });
  }

  return (
    <>
      {tests.length > 0 ? (
        <div className="row mt-3 d-flex justify-content-around bg-warning-subtle p-3">
          <div className="text-center">
            <h3>Available Tests</h3>
          </div>
          {tests.map((test, index) => {
            if (!test.testComplete) {
              return (
                <>
                  <div className="col-md-4 p-3 bg-white ">
                    <h5>
                      <span className="pe-3">Test Name:</span>
                      <span>{test.testDetails.testName}</span>
                    </h5>
                    <p>
                      <span className="pe-3">Test Duration:</span>
                      <span className="pe-3">
                        {test.testDetails.testTime.substring(0, 2) + " "}hours
                      </span>
                      <span>
                        {test.testDetails.testTime.substring(
                          3,
                          test.testDetails.testTime.length
                        ) + " "}
                        minutes
                      </span>
                    </p>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        dispatch({ type: "startTest", index: index })
                      }
                    >
                      <Link
                        to={"/studentdashboard/starttest"}
                        className="text-decoration-none"
                      >
                        Start Test
                      </Link>
                    </button>
                  </div>
                </>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div className="row mt-3 d-flex justify-content-around bg-warning-subtle p-3">
          <div className="text-center">
            <h3>No Tests Available</h3>
          </div>
        </div>
      )}
      {tests.length > 0 ? (
        <div className="row mt-3 d-flex justify-content-around bg-warning-subtle p-3">
          <div className="text-center">
            <h3>completed Tests</h3>
          </div>
          {tests.map((test, index) => {
            if (test.testComplete) {
              return (
                <>
                  <div className="col-md-4 p-3 bg-white m-1">
                    <h5>
                      <span className="pe-3">Test Name:</span>
                      <span>{test.testDetails.testName}</span>
                    </h5>
                    <p>
                      <span className="pe-3">Test Duration:</span>
                      <span className="pe-3">
                        {test.testDetails.testTime.substring(0, 2) + " "}hours
                      </span>
                      <span>
                        {test.testDetails.testTime.substring(
                          3,
                          test.testDetails.testTime.length
                        ) + " "}
                        minutes
                      </span>
                    </p>
                    <h3>Score:{test.score}</h3>
                  </div>
                </>
              );
            }
            return null;
          })}
        </div>
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
