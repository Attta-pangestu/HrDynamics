import department from "../models/departmentModel.js";

const addDepartment = async (req, res) => {
  try {
    const { deptName, description } = req.body;
    const newDept = new department({
      deptName: deptName,
      description: description,
    });
    await newDept.save();
    return res.status(200).json({ success: true, department: newDept });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { deptName, description } = req.body;
    const updateDept = await department.findByIdAndUpdate(
      { _id: id },
      {
        deptName: deptName,
        description: description,
      },
      { new: true } // Return the updated document
    );

    if (!updateDept) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: updateDept });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await department.findById({ _id: id });

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting department with ID:", id);
    const dept = await department.findByIdAndDelete({ _id: id });

    if (!dept) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, dept });
  } catch (error) {
    console.log("Error in deleteDepartment:", error);
    return res
      .status(500)
      .json({ success: false, error: "delete department server error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  deleteDepartment,
  updateDepartment,
};
