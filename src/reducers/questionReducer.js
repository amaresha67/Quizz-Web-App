import React, { createContext, useReducer } from "react";
import { current, produce } from "immer";

export const InitialStateContext = createContext();

const initialState = {
  questions: [],
  currentQuestion: {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  },
  currentTest: {
    questions: [],
    testDetails: { testTime: "", testName: "" },
    testComplete: false,
    score: 0,
  },
  tests: [],
  editTest: false,
  editTestIndex: null,
  presentTestIndex: null,
  login: {
    teacherLogin: false,
    studentlogin: false,
  },
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
    case "AddTest":
      return produce(state, (draftState) => {
        const temp = {
          questions: [],
          testDetails: { testName: "", testTime: "" },
        };
        temp.questions = action.questions;
        temp.testDetails.testTime = action.testTime;
        temp.testDetails.testName = action.testName;
        draftState.tests.push(temp);

        draftState.questions = [];
        draftState.testDetails.testName = "";
        draftState.testDetails.testTime = "";
      });
    case "UpdateTest":
      return produce(state, (draftState) => {
        const temp = {
          questions: [],
          testDetails: { testName: "", testTime: "" },
        };
        temp.questions = action.questions;
        temp.testDetails.testTime = action.testTime;
        temp.testDetails.testName = action.testName;
        draftState.tests[state.editTestIndex] = temp;
        draftState.questions = [];
        draftState.testDetails.testName = "";
        draftState.testDetails.testTime = "";
        draftState.editTest = false;
      });
    case "EditTest":
      return produce(state, (draftState) => {
        draftState.questions = state.tests[action.index].questions;
        draftState.testDetails.testName =
          state.tests[action.index].testDetails.testName;
        draftState.testDetails.testTime =
          state.tests[action.index].testDetails.testTime;
        draftState.editTestIndex = action.index;
        draftState.editTest = true;
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

    case "deleteTest":
      return produce(state, (draftState) => {
        if (state.tests.length < 1) {
          draftState.testCreated = false;
        }
        draftState.tests.splice(action.index, 1);
      });

    case "startTest":
      return produce(state, (draftState) => {
        draftState.tests[action.index].testComplete = true;
        draftState.presentTestIndex = action.index;
      });
    case "scoreUpdate":
      return produce(state, (draftState) => {
        draftState.tests[state.presentTestIndex].score = action.score;
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
