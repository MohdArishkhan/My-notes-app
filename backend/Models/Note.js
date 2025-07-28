import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        required: true,
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true}
);

const Note  = mongoose.model("Note",noteSchema);

export default Note;