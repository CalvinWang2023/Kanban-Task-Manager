import { createSlice } from "@reduxjs/toolkit";

const ActiveBoardSlice = createSlice({
    name: 'activeBoardIndex',
    initialState: 0,
    reducers: {
        changeActiveBoardIndex: (state, action) => {
            return action.payload.boardIndex;
        },
    },
});

export default ActiveBoardSlice;