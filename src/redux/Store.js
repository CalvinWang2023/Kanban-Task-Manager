import { configureStore } from "@reduxjs/toolkit";
import BoardsSlice from "./BoardsSlice";
import ActiveBoardSlice from "./ActiveBoardSlice";
import SidebarToggleSlice from "./SidebarToggleSlice";
import BoardModalToggleSlice from "./BoardModalToggleSlice";
import BoardModalTypeSlice from "./BoardModalTypeSlice";
import TaskModalToggleSlice from "./TaskModalToggleSlice";
import AddEditTaskModalToggleSlice from "./AddEditTaskModalToggleSlice";
import AddEditTaskModalTypeSlice from "./AddEditTaskModalTypeSlice";
import DeleteModalToggleSlice from "./DeleteModalToggleSlice";
import DeleteModalTypeSlice from "./DeleteModalTypeSlice";
import SidebarMobileToggleSlice from "./SidebarMobileToggleSlice";

const store = configureStore({
    reducer: {
        boards: BoardsSlice.reducer,
        activeBoardIndex: ActiveBoardSlice.reducer,
        sidebarToggle: SidebarToggleSlice.reducer,
        boardModalToggle: BoardModalToggleSlice.reducer,
        taskModalToggle: TaskModalToggleSlice.reducer,
        addEditTaskModalToggle: AddEditTaskModalToggleSlice.reducer,
        deleteModalToggle: DeleteModalToggleSlice.reducer,
        sidebarMobileToggle: SidebarMobileToggleSlice.reducer,
        boardModalType: BoardModalTypeSlice.reducer,
        addEditTaskModalType: AddEditTaskModalTypeSlice.reducer,
        deleteModalType: DeleteModalTypeSlice.reducer
    }
});

export default store;