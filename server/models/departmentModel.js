import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    deptName :{type:String,required: true},
    description : {type: String},
    createdAt : {type: Date, default :Date.now() },
    updatedAt : {type: Date, default :Date.now() },
})

// console.log("done")

const department = mongoose.model("department",departmentSchema)

export default department
