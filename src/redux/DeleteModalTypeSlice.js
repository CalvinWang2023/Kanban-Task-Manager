import { createSlice } from "@reduxjs/toolkit";

const DeleteModalTypeSlice = createSlice({
    name: 'deleteModalType',
    initialState: '',
    reducers: {
        changeBoardType: (state) => {
            return 'board';
        },
        changeTaskType: (state) => {
            return 'task';
        }
    },
});

export default DeleteModalTypeSlice;