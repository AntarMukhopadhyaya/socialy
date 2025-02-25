import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    firstName: { type: String, required:false},
    lastName: { type: String, required:false},
    profileImage: { type: String, required:false},
    username: { type: String, required:true,unique: true},
    email: { type: String, required:true,unique: true},
    password: { type: String, required:true},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
       return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

export default mongoose.model("User",userSchema);