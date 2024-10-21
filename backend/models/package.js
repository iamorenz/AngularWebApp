/**
 * Mongoose schema for Package collection.
 * Represents the package details and their associated driver.
 *
 * @requires mongoose - Mongoose library for MongoDB.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Package Schema
 *
 * @typedef {Object} Package
 * @property {string} package_id - Unique identifier for the package, auto-generated using a custom function.
 * @property {string} package_title - Title of the package, must be between 3 and 15 alphanumeric characters.
 * @property {number} package_weight - Weight of the package, must be a positive number.
 * @property {string} package_destination - The destination address for the package, between 5 and 15 alphanumeric characters.
 * @property {string} package_description - A brief description of the package, defaulting to "No description provided".
 * @property {Date} package_createdAt - Date when the package record was created, defaults to the current date.
 * @property {boolean} package_isAllocated - Boolean representing if the package has been allocated to a driver.
 * @property {ObjectId} driver_id - Reference to the driver assigned to the package.
 */
const packageSchema = new Schema({
  package_id: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      const initials = "GZ";
      const randomNum = Math.floor(Math.random() * 900 + 100);
      const randomUp = Array.from({ length: 2 }, () =>
        String.fromCharCode(Math.floor(Math.random() * 26) + 65)
      ).join("");

      return `P${randomUp}-${initials}-${randomNum}`;
    },
  },

  package_title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    match: /^[a-zA-Z0-9]+$/,
  },

  package_weight: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Weight must be greater than 0",
    },
  },

  package_destination: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    match: /^[a-zA-Z0-9]+$/,
  },

  package_description: {
    type: String,
    minlength: 0,
    maxlength: 30,
    default: "No description provided",
  },

  package_createdAt: {
    type: Date,
    default: Date.now,
  },

  package_isAllocated: {
    type: Boolean,
    required: true,
  },

  driver_id: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
  },
});

module.exports = mongoose.model("Package", packageSchema);
