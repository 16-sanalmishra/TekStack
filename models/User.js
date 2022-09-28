import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    techstack: {
        type:String,
        require: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    }
})
const User = mongoose.model("User", userSchema);
export default User;