import department from "../models/departmentModel.js"

const addDepartment = async(req,res) =>{
    try {
        const {deptName,description} =req.body
        const newDept = new department({
            deptName:deptName,
            description:description,
        })
        await newDept.save()
        return res.status(200).json({success:true,department:newDept})
    } catch (error) {
        return res.status(500).json({success:false,error:"add department server error"})
    }
}

const getDepartment = async (req,res) =>{
    try {
        const departments = await department.find()
        return res.status(200).json({success:true,departments})
    } catch (error) {
        return res.status(500).json({success:false,error:"get department server error"})
        
    }
}

const deleteDepartment = async(req,res) =>{
    try {
        const {id} = req.params
        const department = await department.findByIdAndDelete(id)
        return res.status(200).json({success:true,department})
    } catch (error) {
        return res.status(500).json({success:false,error:"delete department server error"})
    }
}

export {addDepartment,getDepartment,deleteDepartment}