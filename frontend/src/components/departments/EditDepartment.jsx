import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const EditDepartment = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDeptLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data.departments[0]._id);

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dept, index) => ({
            _id: dept._id,
            sno: index + 1,
            dept_name: dept.deptName,
            action: <DepartmentButtons _id={dept._id} />,
          }));
          setDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDeptLoading(false);
      }
    };
    fetchDepartments();
  }, []);
  return <div>EditDepartment</div>;
};

export default EditDepartment;
