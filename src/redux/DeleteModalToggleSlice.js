import { createSlice } from "@reduxjs/toolkit";

const DeleteModalToggleSlice = createSlice({
    name: 'deleteModalToggle',
    initialState: false,
    reducers: {
        toggledeleteModal: (state) => {
            return !state;
        },
    },
});

export default DeleteModalToggleSlice;