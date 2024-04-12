import { useContext, useState } from "react";
import { InitialStateContext } from "../../reducers/questionReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function TeacherDashboard() {
  return (
    <div className="h-100  pb-5">
      <Routes>
        <Route path="/" element={<TeacherHome />} />
        <Route path="/creattest" element={<CreateTest />} />
      </Routes>
    </div>
  );
}

function TeacherHome() {
  const { state, dispatch } = useContext(InitialStateContext);
  const Time = state.testDetails.testTime;
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1>Teacher Dashboard</h1>
        </div>
      </div>
      <div className="row ">
        {state.testCreated ? (
          <div className="col">
            <button className="btn btn-primary">
              <Link
                to="/teacherdashboard/creattest"
                className="text-decoration-none text-white"
              >
                Edit test
              </Link>
            </button>
          </div>
        ) : (
          <div className="col">
            <button className="btn btn-primary">
              <Link
                to="/teacherdashboard/creattest"
                className="text-decoration-none text-white"
              >
                Create New Test
              </Link>
            </button>
          </div>
        )}
      </div>
      {state.testCreated && (
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
            <button
              className="btn btn-primary"
              onClick={() =>
                dispatch({
                  type: "deleteTest",
                })
              }
            >
              Delete Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CreateTest() {
  const navigate = useNavigate();
  const [editQuestion, setEditQuestion] = useState({
    status: false,
    index: "",
  });
  const { state, dispatch } = useContext(InitialStateContext);
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col col-md-6">
          <div className="add-question-section">
            <h2>Add Question</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-1 "
                placeholder="Enter question"
                value={state.currentQuestion.question}
                onChange={(e) =>
                  dispatch({
                    type: "QuestionChange",
                    question: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group mb-1">
              {state.currentQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    dispatch({
                      type: "OptionChange",
                      option: e.target.value,
                      index: index,
                    })
                  }
                />
              ))}
            </div>
            <div className="form-group mb-1">
              <select
                className="form-control"
                value={state.currentQuestion.correctAnswer}
                onChange={(e) =>
                  dispatch({
                    type: "CorrectAnswer",
                    correctAnswer: e.target.value,
                  })
                }
              >
                <option value="">Select correct answer</option>
                {state.currentQuestion.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary me-3"
                onClick={() => {
                  dispatch({
                    type: "AddQuestion",
                    question: state.currentQuestion,
                  });
                  setEditQuestion({ ...editQuestion, status: false });
                }}
              >
                Add Question
              </button>
              {editQuestion.status && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch({
                      type: "updateQuestion",
                      question: state.currentQuestion,
                      index: editQuestion.index,
                    });
                    setEditQuestion({ ...editQuestion, status: false });
                  }}
                >
                  Update Question
                </button>
              )}
            </div>

            <div
              className={`row ${
                state.questions.length > 0 ? "mt-3" : "d-none"
              }`}
            >
              <div className="col-md-5">
                <label htmlFor="testName">Test Name:</label>
                <input
                  type="text"
                  id="testName"
                  className="form-control"
                  value={state.testDetails.testName}
                  onChange={(e) => {
                    dispatch({
                      type: "testName",
                      testName: e.target.value,
                    });
                  }}
                />
                <label htmlFor="testTime">Test Time:</label>
                <input
                  type="text"
                  id="testTime"
                  placeholder="Ex 02:30"
                  className="form-control"
                  value={state.testDetails.testTime}
                  onChange={(e) => {
                    dispatch({
                      type: "testTime",
                      testTime: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${
                  state.questions.length > 0 ? " col-md-3 mt-3 " : "d-none"
                }`}
              >
                <button
                  className="btn btn-primary mt-5"
                  onClick={() => {
                    dispatch({
                      type: "testCreated",
                    });
                    toast.success("Test is added!", {
                      autoClose: 3000,
                    });
                    setTimeout(() => {
                      navigate("/teacherdashboard");
                    }, 3000);
                  }}
                >
                  Add Test
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="px-2">Questions Added</h2>
          <div
            className="added-questions-section"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <ul className="list-group">
              {state.questions.map((question, index) => (
                <li key={index} className="list-group-item mb-1">
                  <p>
                    <span className="text-danger px-2">{index + 1}</span>
                    {question.question}
                  </p>
                  <ul className="list-group">
                    {question.options.map((option, index) => (
                      <li key={index} className="list-group-item">
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <span>Correct Answer: {question.correctAnswer}</span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="px-2"
                      onClick={() => {
                        dispatch({
                          type: "deleteQuestion",
                          index: index,
                        });
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="px-2"
                      onClick={() => {
                        setEditQuestion({ status: true, index: index });
                        dispatch({
                          type: "setEditQuestion",
                          index: index,
                        });
                      }}
                    />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default TeacherDashboard;
