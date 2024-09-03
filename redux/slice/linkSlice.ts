import { Links } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type Link = Links

const initialState : Link[] = []

export const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        addLink: (state, action) => {
            state.push(action.payload);
        },
        removeLink: (state, action) => {
            return state.filter(link => link?.id !== action.payload.id);
        },
        updateLink: (state, action) => {
            const index = state.findIndex(link => link?.id === action.payload.id);
            state[index] = action.payload;
        },
        setLinks : (state, action) => {
            return action.payload;
        }
    }
});

export const { addLink, removeLink, updateLink, setLinks } = linkSlice.actions;
export default linkSlice.reducer;