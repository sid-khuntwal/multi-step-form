const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    country: {
        type: String
    }
}, { timestamps: true })

const formModel = mongoose.model("Form", formSchema);

module.exports = formModel;