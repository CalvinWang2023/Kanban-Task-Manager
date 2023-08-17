import { createSlice } from "@reduxjs/toolkit";

const BoardModalTypeSlice = createSlice({
    name: 'boardModalType',
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

export default BoardModalTypeSlice;