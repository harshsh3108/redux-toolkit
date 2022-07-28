import { createSlice } from "@reduxjs/toolkit";
import { employeesData } from "../data";

const initialState = {
  employees: employeesData,
  selectedEmployee: null,
  isEditing: false,
  isAdding: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    setSelectedEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setIsAdding(state, action) {
      state.isAdding = action.payload;
    },
  },
});

export const { setEmployees, setSelectedEmployee, setIsEditing, setIsAdding } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
