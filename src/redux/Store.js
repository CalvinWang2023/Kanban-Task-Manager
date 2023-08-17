import { configureStore } from "@reduxjs/toolkit";
import BoardsSlice from "./BoardsSlice";
import ActiveBoardSlice from "./ActiveBoardSlice";
import SidebarToggleSlice from "./SidebarToggleSlice";
import BoardModalToggleSlice from "./BoardModalToggleSlice";
import BoardModalTypeSlice from "./BoardModalTypeSlice";

const store = configureStore({
    reducer: {
        boards: BoardsSlice.reducer,
        activeBoardIndex: ActiveBoardSlice.reducer,
        sidebarToggle: SidebarToggleSlice.reducer,
        boardModalToggle: BoardModalToggleSlice.reducer,
        boardModalType: BoardModalTypeSlice.reducer
    }
});

export default store;