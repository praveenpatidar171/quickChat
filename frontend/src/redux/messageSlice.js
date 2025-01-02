import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        allMessages: [],
    },
    reducers: {
        setAllMessages: (state, action) => {
            state.allMessages = action.payload;
        },
    }
})

export const { setAllMessages } = messageSlice.actions;
export default messageSlice.reducer; 