import mongoose from "mongoose";

const userCollection = 'users'
const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    age: {type: Number},
    password: {type: String},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carts"},
    role: {type: String, enum: ['user', 'admin', 'premium'], default: 'user'},
})
mongoose.set("strictQuery", false)
const userModel = mongoose.model(userCollection, userSchema)
export default userModel