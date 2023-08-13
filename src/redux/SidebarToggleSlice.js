import { createSlice } from "@reduxjs/toolkit";

const SidebarToggleSlice = createSlice({
    name: "sidebarToggle",
    initialState: false,
    reducers: {
        toggleSidebar: (state) => {
            return !state;
        }
    }
});

export default SidebarToggleSlice;