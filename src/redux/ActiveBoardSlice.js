import { createSlice } from "@reduxjs/toolkit";

const ActiveBoardSlice = createSlice({
    name: 'activeBoardIndex',
    initialState: 0,
    reducers: {
        changeActiveBoardIndex: (state, action) => {
            const payload = action.payload;
            state = payload.board_index;
        },
    },
});

export default ActiveBoardSlice;