import { configureStore } from "@reduxjs/toolkit";
import BoardsSlice from "./BoardsSlice";
import ActiveBoardSlice from "./ActiveBoardSlice";
import SidebarToggleSlice from "./SidebarToggleSlice";
import BoardModalToggleSlice from "./BoardModalToggleSlice";
import BoardModalTypeSlice from "./BoardModalTypeSlice";
import TaskModalToggleSlice from "./TaskModalToggleSlice";
import AddEditTaskModalToggleSlice from "./AddEditTaskModalToggleSlice";
import AddEditTaskModalTypeSlice from "./AddEditTaskModalTypeSlice";

const store = configureStore({
    reducer: {
        boards: BoardsSlice.reducer,
        activeBoardIndex: ActiveBoardSlice.reducer,
        sidebarToggle: SidebarToggleSlice.reducer,
        boardModalToggle: BoardModalToggleSlice.reducer,
        taskModalToggle: TaskModalToggleSlice.reducer,
        addEditTaskModalToggle: AddEditTaskModalToggleSlice.reducer,
        boardModalType: BoardModalTypeSlice.reducer,
        addEditTaskModalType: AddEditTaskModalTypeSlice.reducer
    }
});

export default store;