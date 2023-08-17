import { createSlice } from "@reduxjs/toolkit";
import data from'../data.json';

const BoardsSlice = createSlice({
    name: "boards",
    initialState: data.boards,
    reducers: {
        addBoard: (state, action) => {
            const payload = action.payload;
            const board = {
                name: payload.name,
                columns: [],
            };
            board.columns = payload.newColumns;
            state.push(board);
        },
        editBoard: (state, action) => {
            const payload = action.payload;
            const activeBoard = state[payload.index];
            activeBoard.name = payload.name;
            activeBoard.columns = payload.newColumns;
        },
    },
});

export default BoardsSlice;
 