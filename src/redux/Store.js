import { configureStore } from "@reduxjs/toolkit";
import BoardsSlice from "./BoardsSlice";
import ActiveBoardSlice from "./ActiveBoardSlice";
import SidebarToggleSlice from "./SidebarToggleSlice";
import BoardModalToggleSlice from "./BoardModalToggleSlice";
import BoardModalTypeSlice from "./BoardModalTypeSlice";
import TaskModalToggleSlice from "./TaskModalToggleSlice";

const store = configureStore({
    reducer: {
        boards: BoardsSlice.reducer,
        activeBoardIndex: ActiveBoardSlice.reducer,
        sidebarToggle: SidebarToggleSlice.reducer,
        boardModalToggle: BoardModalToggleSlice.reducer,
        taskModalToggle: TaskModalToggleSlice.reducer,
        boardModalType: BoardModalTypeSlice.reducer
    }
});

export default store;