const userModel = require("../models/userModel");
const formModel = require("../models/formModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find({});
        return res.status(200).send({
            userCount: user.length,
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "User Not Found"
        })
    }
}

exports.registerController = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Enter all the values"
            })
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) return res.status(401).send({ success: false, message: "Already a user, try login?" })

        const hashedPass = await bcrypt.hash(password, 10);


        const user = new userModel({ username, email, password: hashedPass });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "User Registered",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
            error
        })
    }

}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please provide email or password",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registerd",
            });
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
            });
        }
        return res.status(200).send({
            success: true,
            messgae: "login successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callcback",
            error,
        });
    }
};


exports.getDataController = async (req, res) => {

    try {
        const data = await formModel.find({});
        return res.status(200).send({
            success: true,
            data
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Not found"
        })
    }
}

exports.sendDataController = async (req, res) => {
    try {
        const { username, email, phone, address, city, state, pincode, country, userId } = req.body;

        const exisitingUser = await userModel.findById(userId);
        //validaton
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",
            });
        }

        const data = new formModel({ username, email, phone, address, city, state, pincode, country, userId });
        const session = await mongoose.startSession();
        session.startTransaction();
        await data.save({ session });
        exisitingUser.data.push(data);
        await exisitingUser.save({ session });
        await session.commitTransaction();


        await data.save();
        return res.status(201).send({
            success: true,
            message: "Data Saved",
            data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in Send data callback',
            success: false,
            error
        })
    }
}

exports.userDataControlller = async (req, res) => {
    try {
        const userdata = await userModel.findById(req.params.id).populate("data");
        const data = userdata.data;
        if (!userdata) {
            return res.status(404).send({
                success: false,
                message: "Data not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user data",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user data controller",
            error,
        });
    }
};