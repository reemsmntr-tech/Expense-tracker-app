import mongoose from "mongoose";

interface User {
 _id: mongoose.Types.ObjectId
 username: string
 email: string
 password: string
}

const userSchema = new mongoose.Schema<User>({
  username:{
    type: String ,
    required: true,
  },
  email: {
    type: String,
    required: true ,
    match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    unique: true
  },
  password:{
    type: String ,
    required: true ,
    minLength: 8 ,
  } ,
},{
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User