import { produce } from "immer";

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
