import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    plan_name: String,
    account_sizes: Object
},
    { timestamps: true }
);
export const PlanModel = mongoose.model("Plan", planSchema);

