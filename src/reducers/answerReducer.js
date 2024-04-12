import { createContext } from "react";
import { produce } from "immer";

export const InitialAnswersContext = createContext();
export const initialState = {
  answers: {},
};

const answerReducer = (state, action) => {
  switch (action.type) {
    case "AddAnswer":
      return produce(state, (draftstate) => {
        draftstate.answers[action.questionIndex] = action.selectedOption;
      });
    default:
      return state;
  }
};

export default answerReducer;
