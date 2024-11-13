import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import trashIcon from '../assets/icons/trash.png'

export const columns =[
    {
        name : "S No",
        selector : (row)=>row.sno,
        sortable: true,
    },
    {
        name : "Department Name",
        selector : (row)=>row.dept_name,
        sortable: true,
    },
    {
        name : "Action",
        selector : (row)=>row.action
    },
]


export const DepartmentButtons = (_id) => {
    const navigate = useNavigate()
    return (
        <>
            <button 
            onClick={()=>navigate(`/admin-dashboard/departments/${_id}`)} 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
            <FiEdit />
            </button>
            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2">
                <RiDeleteBin6Line />
            </button>
        </>
    );
};
