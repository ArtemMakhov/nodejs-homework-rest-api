const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        password: {
            type: String,
            minLength: 6,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            index:true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },

    }
);


const User = model("user", userSchema);

module.exports = {
    User,
};