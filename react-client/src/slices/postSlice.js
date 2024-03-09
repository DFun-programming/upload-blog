import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentPost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },

    setPost(state, value) {
      state.currentPost = value.payload;
    },
  },
});

export const { setLoading, setPost } = postSlice.actions;

export default postSlice.reducer;
