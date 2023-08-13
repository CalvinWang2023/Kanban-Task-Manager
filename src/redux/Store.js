import { configureStore } from "@reduxjs/toolkit";
import BoardsSlice from "./BoardsSlice";
import ActiveBoardSlice from "./ActiveBoardSlice";

const store = configureStore({
    reducer: {
        boards: BoardsSlice.reducer,
        activeBoardIndex: ActiveBoardSlice.reducer
    }
});

export default store;