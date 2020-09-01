export const setPostsList = (list: Array<Object>) => {
  return {
    type: "SET_POSTS_LIST",
    list,
  };
};
