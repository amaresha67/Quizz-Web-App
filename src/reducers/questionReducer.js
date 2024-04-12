import React, { createContext, useReducer } from "react";
import { produce } from "immer";

export const InitialStateContext = createContext();

const initialState = {
  questions: [],
  testDetails: { testTime: "", testName: "" },
  currentQuestion: {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
  testCreated: false,
  login: {
    teacherLogin: false,
    studentlogin: false,
  },
  testSubmit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AddQuestion":
      return produce(state, (draftState) => {
        draftState.currentQuestion = {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        };

        draftState.questions.push(action.question);
      });
    case "updateQuestion":
      return produce(state, (draftState) => {
        draftState.currentQuestion = {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        };

        draftState.questions[action.index] = action.question;
      });
    case "QuestionChange":
      return produce(state, (draftState) => {
        draftState.currentQuestion.question = action.question;
      });
    case "OptionChange":
      return produce(state, (draftState) => {
        draftState.currentQuestion.options[action.index] = action.option;
      });

    case "CorrectAnswer":
      return produce(state, (draftState) => {
        draftState.currentQuestion.correctAnswer = action.correctAnswer;
      });

    case "deleteQuestion":
      const newQuestions = state.questions.filter(
        (question, index) => index !== action.index
      );
      return produce(state, (draftState) => {
        draftState.questions = newQuestions;
      });
    case "setEditQuestion":
      const editQuestion = state.questions[action.index];

      return produce(state, (draftState) => {
        draftState.currentQuestion = editQuestion;
      });
    case "testTime":
      return produce(state, (draftState) => {
        draftState.testDetails.testTime = action.testTime;
      });
    case "testName":
      return produce(state, (draftState) => {
        draftState.testDetails.testName = action.testName;
      });
    case "testCreated":
      return produce(state, (draftState) => {
        draftState.testCreated = true;
      });
    case "deleteTest":
      return produce(state, (draftState) => {
        draftState.testCreated = false;
        draftState.questions = [];
      });
    case "testSubmit":
      return produce(state, (draftState) => {
        draftState.testSubmit = true;
      });
    case "teacherLogin":
      return produce(state, (draftState) => {
        draftState.login.teacherLogin = true;
      });
    case "studentLogin":
      return produce(state, (draftState) => {
        draftState.login.studentLogin = true;
      });
    case "logout":
      return produce(state, (draftState) => {
        draftState.login.teacherLogin = false;
        draftState.login.studentLogin = false;
      });
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InitialStateContext.Provider value={{ state, dispatch }}>
      {children}
    </InitialStateContext.Provider>
  );
};
