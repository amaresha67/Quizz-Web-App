import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import answerreducer from "../../reducers/answerReducer";
import { initialState } from "../../reducers/answerReducer";
import StudentHome from "./StudentHome";
import TestPage from "./TestPage";

function StudentDashboard() {
  const [AnswerState, AnswerDispatch] = useReducer(answerreducer, initialState);

  return (
    <div className="container-fluid h-100 bg-secondary pb-5">
      {" "}
      {/* Use Bootstrap container class */}
      <div className="row justify-content-center align-items-center h-100">
        {" "}
        {/* Use Bootstrap grid system */}
        <div className="col-md-8">
          {" "}
          {/* Adjust column width for medium-sized screens */}
          <Routes>
            <Route
              path="/"
              element={<StudentHome AnswerState={AnswerState} />}
            />
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
      </div>
    </div>
  );
}

export default StudentDashboard;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useReducer } from "react";
// import answerreducer from "../../reducers/answerReducer";
// import { initialState } from "../../reducers/answerReducer";
// import StudentHome from "./StudentHome";
// import TestPage from "./TestPage";
// function StudentDashboard() {
//   const [AnswerState, AnswerDispatch] = useReducer(answerreducer, initialState);

//   return (
//     <div className="h-100 bg-secondary pb-5">
//       <Routes>
//         <Route path="/" element={<StudentHome AnswerState={AnswerState} />} />
//         <Route
//           path="/starttest"
//           element={
//             <TestPage
//               AnswerState={AnswerState}
//               AnswerDispatch={AnswerDispatch}
//             />
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default StudentDashboard;
