import axios from "axios";
import React, { useState, useEffect } from "react";

const EditDepartment = ({ setEditDepartmentVisibility, department, fetchDepartments}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [updatedDepartment, setUpdatedDepartment] = useState({
    deptName: department?.deptName || "",
    description: department?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDepartment({ ...updatedDepartment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://https://5000-idx-hrdynamics-1733934878574.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev//api/department/${department._id}`,
        updatedDepartment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setEditDepartmentVisibility(false);
        fetchDepartments();
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
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
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4">
        <h3 className="font-semibold text-3xl mb-6 text-center">
          Edit Department
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Department Name
            </label>
            <input
              type="text"
              name="deptName"
              value={updatedDepartment.deptName}
              className="w-full px-4 py-2 border rounded-md"
              style={inputStyle}
              onChange={handleChange}
              autoFocus
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Department Description
            </label>
            <textarea
              rows={6}
              name="description"
              value={updatedDepartment.description}
              className="w-full px-4 py-2 border rounded-md"
              style={inputStyle}
              onChange={handleChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </div>

          <button type="submit" className="btn bg-primary text-white" style={btnStyle}>
            Save Changes
          </button>
          <button
            type="button"
            className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 transition duration-300"
            style={btnStyle}
            onClick={() => setEditDepartmentVisibility(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
