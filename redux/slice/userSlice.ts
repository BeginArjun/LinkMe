import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

// Define the user state type
export type userState = User | null;

// Fetch initial user data (You may want to handle errors and add async handling appropriately)
let initialState: userState = null;

// Create the user slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: () => {
            return null;
        },
    }
});

// Export actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
