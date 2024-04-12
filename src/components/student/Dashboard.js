import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import answerreducer from "../../reducers/answerReducer";
import { initialState } from "../../reducers/answerReducer";
import StudentHome from "./StudentHome";
import TestPage from "./TestPage";
function StudentDashboard() {
  const [AnswerState, AnswerDispatch] = useReducer(answerreducer, initialState);

  return (
    <div className="h-100 pb-5">
      <Routes>
        <Route path="/" element={<StudentHome AnswerState={AnswerState} />} />
        <Route
          path="/starttest"
          element={
            <TestPage
              AnswerState={AnswerState}
              AnswerDispatch={AnswerDispatch}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default StudentDashboard;
