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
    },
});

export default BoardsSlice;
 