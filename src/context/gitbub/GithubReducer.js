export default (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };

    case "SET_SEARCH_TEXT":
      return {
        ...state,
        search: action.payload,
      };

    case "GET_SINGLE_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "GET_USER_REPOS":
      return {
        ...state,
        repos: action.payload,
        isLoading: false,
      };

    default:
      throw new Error(`Case: ${action.type} is not declared`);
    // return state;
  }
};
