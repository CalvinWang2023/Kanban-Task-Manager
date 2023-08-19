import { createSlice } from "@reduxjs/toolkit";

const AddEditTaskModalTypeSlice = createSlice({
    name: 'addEditTaskModalType',
    initialState: '',
    reducers: {
        changeAddType: (state) => {
            return 'add';
        },
        changeEditType: (state) => {
            return 'edit';
        }
    },
});

export default AddEditTaskModalTypeSlice;