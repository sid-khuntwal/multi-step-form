const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    username: {
        type: String,
        // ref: 'User',
        // type: String,
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
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'state is required']
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    }

}, { timestamps: true })

const formModel = mongoose.model("Form", formSchema);

module.exports = formModel;