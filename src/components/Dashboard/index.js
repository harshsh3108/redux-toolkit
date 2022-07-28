import React, { useEffect, useCallback } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import { useDispatch, useSelector } from "react-redux";
import {
  setEmployees,
  setSelectedEmployee,
  setIsEditing,
  setIsAdding,
} from "../../store/dashboardReducer";

const Dashboard = ({ setIsAuthenticated }) => {
  const dashboard = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const { employees, selectedEmployee, isEditing, isAdding } = dashboard;

  const setAdd = (payload) => dispatch(setIsAdding(payload));
  const setDashboardEmployees = useCallback(
    (payload) => dispatch(setEmployees(payload)),
    [dispatch]
  );
  const setDashboardIsEditing = (payload) => dispatch(setIsEditing(payload));

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees_data"));
    if (data !== null && Object.keys(data).length !== 0)
      setDashboardEmployees(data);
  }, [setDashboardEmployees]);

  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee.id === id);

    dispatch(setSelectedEmployee(employee));
    setDashboardIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const employee = employees.find((employee) => employee.id === id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(
          (employee) => employee.id !== id
        );
        localStorage.setItem("employees_data", JSON.stringify(employeesCopy));
        setDashboardEmployees(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setAdd}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setDashboardEmployees}
          setIsAdding={setAdd}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setDashboardEmployees}
          setIsEditing={setDashboardIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
