const initState = {
  addOne: [],
};

const bookReducer = (state = initState, action) => {
  let newState = state;
  switch (action.type) {
    case "ADD_BOOK":
      let shouldAdd = newState.addOne.includes(action.data);
      if (!shouldAdd) {
        newState = { ...state, addOne: [...state.addOne, action.data] };
        return newState;
      }
      break;
    default:
      return state;
  }
  return newState;
};

export default bookReducer;
