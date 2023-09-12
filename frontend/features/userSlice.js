import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const user = JSON.parse(localStorage.getItem("user"));

//redux prop
const initalState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  return userService.logout();
});

export const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  //this here is userSlice.actions
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  //this here is userSlice.reducer
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailure = true;
        state.message = action.payload;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailure = true;
        state.message = action.payload;
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
