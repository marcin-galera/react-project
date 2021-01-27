import { store } from "../helpers/store";

export const addBook = (id) => {
  return (dispatch) => {
    dispatch({ type: "ADD_BOOK", data: id });
  };
};

export const removeBook = (id) => {
  let tempState = store.getState();

  let temporaryState = tempState.bookReducer.addOne.filter(
    (book) => book !== id
  );

  return (dispatch) => {
    dispatch({ type: "REMOVE_BOOK", data: temporaryState });
  };
};
