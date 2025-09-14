import mongoose from "mongoose";

const {Schema, model } = mongoose;

const UserSchema = Schema({
    user_name: { type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    role: {type: String, enum: ["admin", "doctor", "receptionst", "cashier"]},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }
}, {timestamps: true})

const USER_MODEL = model("USER", UserSchema)
export default USER_MODEL;