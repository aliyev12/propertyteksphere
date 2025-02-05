"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Property"
        },
    ]
}, {
    timestamps: true
});
var User = mongoose_1.models.User || mongoose_1.model("User", UserSchema);
exports["default"] = User;
