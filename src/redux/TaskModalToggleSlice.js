import { createSlice } from "@reduxjs/toolkit";

const TaskModalToggleSlice = createSlice({
    name: 'taskModalToggle',
    initialState: false,
    reducers: {
        toggleTaskModal: (state) => {
            return !state;
        },
    },
});

export default TaskModalToggleSlice;