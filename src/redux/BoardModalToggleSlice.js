import { createSlice } from "@reduxjs/toolkit";

const BoardModalToggleSlice = createSlice({
    name: 'boardModalToggle',
    initialState: false,
    reducers: {
        toggleBoardModal: (state) => {
            return !state;
        },
    },
});

export default BoardModalToggleSlice;