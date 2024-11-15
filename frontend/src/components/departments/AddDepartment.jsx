import axios from "axios";
import React, { useState } from "react";

const AddDepartment = ({ setAddDepartmentVisibility,fetchDepartments }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [department, setDepartment] = useState({
    deptName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data.success) {
        setAddDepartmentVisibility(false);
        fetchDepartments(); // to refresh the table after adding new dept
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // overlay with transparency
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // ensure it's above other content
  };

  const boxShadow = {
    WebkitBoxShadow: "0px 0px 12px rgba(0, 0, 0, 0.15)",
    MozBoxShadow: "0px 0px 12px rgba(0, 0, 0, 0.15)",
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.15)",
  };

  const inputStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    outlineColor: isFocus ? "#6a28d9" : "",
    width: "100%",
    padding: "15px",
  };

  const btnStyle = {
    width: "100%",
    padding: "15px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    outlineColor: isFocus ? "#6a28d9" : "none",
  };

  return (
    <div style={overlayStyle}>
      <div
        style={boxShadow}
        className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4"
      >
        {/* "relative add-dept-header" add this in H3 class for line animation */}
        <h3 className="font-semibold text-3xl mb-6 text-center">
          Add Department
        </h3>
        <form action="" method="post" onSubmit={handleSubmit}>
          {/* Department Name */}
          <div className="mb-4">
            <label
              htmlFor="deptName"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Department Name
            </label>
            <input
              type="text"
              name="deptName"
              id="deptName"
              className="w-full px-4 py-2 border rounded-md"
              style={inputStyle}
              autoFocus
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleChange}
            />
          </div>

          {/* Department Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Department Description
            </label>
            <textarea
              rows={6}
              name="description"
              id="description"
              className="w-full px-4 py-2 border rounded-md"
              style={inputStyle}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-primary text-white font-semibold py-2 transition duration-300"
            style={btnStyle}
          >
            Add Department
          </button>
          <button
            className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 transition duration-300"
            style={btnStyle}
            onClick={() => setAddDepartmentVisibility(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
