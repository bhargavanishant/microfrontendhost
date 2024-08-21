import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import type { RootState } from "./store";

// Define a type for the slice state
interface NetworkErrorState {
  data: any;
}

// Define the initial state using that type
const initialState: NetworkErrorState = {
  data: [],
};

export const counterSlice = createSlice({
  name: "networkError",
  initialState,
  reducers: {
    updateNetworkErrorLogs: (state, action) => {
      if (action.payload)
        state.data.push({
          ...action.payload,
          time: {
            timestamp: moment().format("DD-MM-YYYY HH:mm:ss"),
          },
        });
    },
  },
});

export const { updateNetworkErrorLogs } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.networkError.data;

export default counterSlice.reducer;
