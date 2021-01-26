export const addBook = (id) => {
  return (dispatch) => {
    dispatch({ type: "ADD_BOOK", data: id });
  };
};
