import { useContext, useState } from "react";
import { InitialStateContext } from "../../reducers/questionReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TestTimer from "./Timer";

function TestPage({ AnswerState, AnswerDispatch }) {
  const [qIndex, setQIndex] = useState(0);
  const { state, dispatch } = useContext(InitialStateContext);
  const navigate = useNavigate();
  var ans = null;

  if (Object.keys(AnswerState).length > 0) {
    ans = AnswerState.answers[qIndex];
  }
  const handleNext = () => {
    if (qIndex < state.tests[state.presentTestIndex].questions.length - 1) {
      setQIndex(qIndex + 1);
    }
  };

  const handlePrev = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
    }
  };

  const handleOptionSelect = (option, qIndex) => {
    AnswerDispatch({
      type: "AddAnswer",
      questionIndex: qIndex,
      selectedOption: option,
    });
  };

  return (
    <div className="container bg-warning-subtle p-2 mt-2">
      <div className="row d-flex justify-content-end m-1">
        <div className="col">
          <h3>{state.tests[state.presentTestIndex].testDetails.testName}</h3>
        </div>
        <TestTimer
          duration={
            parseInt(
              state.tests[
                state.presentTestIndex
              ].testDetails.testTime.substring(0, 2)
            ) *
              60 +
            parseInt(
              state.tests[
                state.presentTestIndex
              ].testDetails.testTime.substring(3, 5)
            )
          }
          onTimerComplete={() => {
            console.log("time over");
          }}
        />
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-7">
          <div className="row bg-white p-3 ">
            {state.tests[state.presentTestIndex].questions &&
              state.tests[state.presentTestIndex].questions[qIndex] && (
                <div className=" bg-primary-subtle m-2 border-primary rounded">
                  <h5>
                    <span className="text-danger pe-1">{qIndex + 1}</span>
                    {
                      state.tests[state.presentTestIndex].questions[qIndex]
                        .question
                    }
                  </h5>
                </div>
              )}
            <div className="px-2 ">
              {state.tests[state.presentTestIndex].questions &&
                state.tests[state.presentTestIndex].questions[qIndex] && (
                  <ol>
                    {state.tests[state.presentTestIndex].questions[
                      qIndex
                    ].options.map((option, index) => (
                      <li
                        key={index}
                        className={
                          ans === option
                            ? "bg-dark-subtle my-1 rounded p-1"
                            : "bg-info-subtle my-1 rounded p-1"
                        }
                        onClick={() => handleOptionSelect(option, qIndex)}
                      >
                        {option}
                      </li>
                    ))}
                  </ol>
                )}
            </div>
          </div>
          <div className="row bg-danger-subtle mt-1 d-flex justify-content-around p-2">
            <div className="col-4">
              <button
                onClick={handlePrev}
                disabled={qIndex === 0}
                className="btn btn-primary"
              >
                Prev
              </button>
            </div>
            <div className="col-4">
              <button
                onClick={handleNext}
                disabled={
                  qIndex ===
                  state.tests[state.presentTestIndex].questions.length - 1
                }
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="col-3 row p-2 bg-white border border-primary"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {state.tests[state.presentTestIndex].questions &&
            state.tests[state.presentTestIndex].questions[qIndex] &&
            state.tests[state.presentTestIndex].questions.map(
              (option, index) => (
                <div
                  className={`rounded rounded-circle m-1 ${
                    qIndex === index
                      ? "bg-primary"
                      : AnswerState.answers[index] === undefined
                      ? "bg-primary-subtle"
                      : "bg-success"
                  } text-center`}
                  style={{ width: "40px", height: "40px", fontSize: "22px" }}
                  onClick={() => {
                    setQIndex(index);
                  }}
                >
                  {console.log("sd", AnswerState.answers[index])}
                  {index + 1}
                </div>
              )
            )}
        </div>
      </div>
      <div className="row">
        <div className="col text-center p-2">
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch({ type: "testSubmit" });
              toast.success("Test completed succesfully!", {
                autoClose: 3000,
              });
              setTimeout(() => {
                navigate("/studentdashboard");
              }, 2000);
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default TestPage;
