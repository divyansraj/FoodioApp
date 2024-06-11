import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setisLoggedIn: (state,action) => {
            state.isLoggedIn = action.payload;
        }
    }
})


export const { setisLoggedIn } = AuthSlice.actions;
export default AuthSlice.reducer;