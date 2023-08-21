import { createSlice } from "@reduxjs/toolkit";

const SidebarMobileToggleSlice = createSlice({
    name: 'sidebarMobileToggle',
    initialState: false,
    reducers: {
        toggleSidebarMobile: (state) => {
            return !state;
        },
    },
});

export default SidebarMobileToggleSlice;