"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PropertySchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    square_feet: {
        type: Number,
        required: true
    },
    amenities: [
        {
            type: String
        },
    ],
    rates: {
        nightly: Number,
        weekly: Number,
        monthly: Number
    },
    seller_info: {
        name: String,
        email: String,
        phone: String
    },
    images: [
        {
            type: String
        },
    ],
    is_featured: {
        type: Boolean,
        "default": false
    }
}, {
    timestamps: true
});
var Property = mongoose_1.models.Property || mongoose_1.model("Property", PropertySchema);
exports["default"] = Property;
