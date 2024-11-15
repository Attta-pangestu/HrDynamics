import React, { useEffect, useState } from "react";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  // console.log(localStorage.getItem("token"));
  
  const [addDepartmentVisibility, setAddDepartmentVisibility] = useState(false);
  const [editDepartmentVisibility, setEditDepartmentVisibility] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDeleteDepartment = async(id)=>{
    const data = filteredDepartments.filter(dept => dept._id != id)
    setDepartments(data)
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (editDepartmentVisibility) {
        setEditDepartmentVisibility(false)
      }
      if (addDepartmentVisibility) {
        setAddDepartmentVisibility(false)
      }
    }
  });

  const fetchDepartments = async () => {
    setDeptLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.data.success) {
        const data = response.data.departments.map((dept, index) => ({
          _id: dept._id,
          sno: index + 1,
          dept_name: dept.deptName,
          action: (
            <DepartmentButtons
              _id={dept._id}
              onEdit={() => handleEdit(dept)}
              onDelete={() => handleDelete(dept._id)}  // Pass the delete handler
            />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDeptLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setEditDepartmentVisibility(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          fetchDepartments(); 
          alert("Department deleted successfully!");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Failed to delete department.");
        }
      }
    }
  };

  const filterDepartments = (e) =>{
    const records = departments.filter(dept => dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase().trim()))
    setFilteredDepartments(records)
  }

  return (
    <div className="p-6 relative">
      {deptLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {addDepartmentVisibility && (
            <AddDepartment 
              setAddDepartmentVisibility={setAddDepartmentVisibility} 
              fetchDepartments={fetchDepartments}
            />
          )}
          {editDepartmentVisibility && currentDepartment && (
            <EditDepartment
              setEditDepartmentVisibility={setEditDepartmentVisibility}
              department={currentDepartment}
              fetchDepartments={fetchDepartments}
            />
          )}
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Department</h3>
          </div>
          <div className="flex justify-between items-center my-4">
            <input
              type="text"
              className="px-4 py-0.5 border"
              name="DeptSearch"
              placeholder="Search by Dept Name"
              onChange={filterDepartments}
            />
            <button
              onClick={() => setAddDepartmentVisibility(true)}
              className="px-4 py-1 bg-primary rounded text-white"
            >
              + Add Department
            </button>
          </div>
          <div className="tableContainer">
            <DataTable columns={columns} data={filteredDepartments} />
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentList;
