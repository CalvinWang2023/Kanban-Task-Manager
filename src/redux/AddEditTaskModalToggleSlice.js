import { createSlice } from "@reduxjs/toolkit";

const AddEditTaskModalToggleSlice = createSlice({
    name: 'addEditTaskModalToggle',
    initialState: false,
    reducers: {
        toggleAddEditTaskModal: (state) => {
            return !state;
        },
    },
});

export default AddEditTaskModalToggleSlice;