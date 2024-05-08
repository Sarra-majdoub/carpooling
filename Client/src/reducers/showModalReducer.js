import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show : false
};

const showModalSlice = createSlice({
    name: 'showModal',
    initialState,
    reducers: {
        closeModal(state) {
            state.show = false;
        },
        openModal(state) {
            state.show = true;
        }
    }
});

export const { openModal, closeModal } = showModalSlice.actions;
export default showModalSlice.reducer;
