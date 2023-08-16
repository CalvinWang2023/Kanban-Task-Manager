import { configureStore } from "@reduxjs/toolkit";
import BoardsSlice from "./BoardsSlice";
import ActiveBoardSlice from "./ActiveBoardSlice";
import SidebarToggleSlice from "./SidebarToggleSlice";
import BoardModalToggleSlice from "./BoardModalToggleSlice";

const store = configureStore({
    reducer: {
        boards: BoardsSlice.reducer,
        activeBoardIndex: ActiveBoardSlice.reducer,
        sidebarToggle: SidebarToggleSlice.reducer,
        boardModalToggle: BoardModalToggleSlice.reducer
    }
});

export default store;