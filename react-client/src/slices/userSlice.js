import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setLoading(state, value) {
        state.loading = value.payload;
      },
      setToken(state, value) {
        state.token = value.payload;
      },
      setUser(state, value) {
        state.currentUser = value.payload
        localStorage.setItem("user",JSON.stringify(value.payload))
      },
  },
});

export const {
setLoading,setToken,setUser
} = userSlice.actions;

export default userSlice.reducer;
