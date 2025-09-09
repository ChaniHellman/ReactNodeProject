import { createSlice } from '@reduxjs/toolkit';

const initValue={
  name:""
}

const userSlice = createSlice({
  name: 'user',
  initialState: initValue,
  reducers: {
    setUsername:(state, action)=> {
      state.name = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
