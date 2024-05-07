import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : undefined
};

const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    }
});

export const { setUser } = UserReducer.actions;
export default UserReducer.reducer;
