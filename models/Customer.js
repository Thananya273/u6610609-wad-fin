import { MoneyOffCsredRounded } from "@mui/icons-material";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String },
    date: { type: Date },
    member: { type: Number },
    interests: { type: String },
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;