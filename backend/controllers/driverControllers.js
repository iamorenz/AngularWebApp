/**
 * Controller for handling driver-related operations.
 *
 * @requires Driver - The Driver model.
 * @requires Package - The Package model.
 */

const Driver = require("../models/driver");
const Package = require("../models/package");
const Statistics = require("../models/statistics");

/**
 * Create a new driver.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the created driver ID or an error message for a bad request.
 */

exports.createDriver = async (req, res) => {
  try {
    const { driver_name, driver_department, driver_license, driver_isActive } =
      req.body;

    const newDriver = new Driver({
      driver_name,
      driver_department,
      driver_license,
      driver_isActive,
    });

    const savedDriver = await newDriver.save();

    await Statistics.updateOne(
      {},
      { $inc: { insertCount: 1 } },
      { upsert: true }
    );

    res.status(201).json({
      id: savedDriver._id,
      driver_id: savedDriver.driver_id,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding driver", error });
  }
};

/**
 * Get all drivers.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with a list of all drivers or an error message.
 */

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({}).populate({
      path: "assigned_packages",
    });

    await Statistics.updateOne(
      {},
      { $inc: { retrieveCount: 1 } },
      { upsert: true }
    );

    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drivers", error });
  }
};

/**
 * Delete a driver by ID.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the result of the deletion or an error message.
 */

exports.deleteDriverById = async (req, res) => {
  try {
    const driverId = req.query.id;

    if (!driverId) {
      return res.status(400).json({ message: "Driver ID is required" });
    }

    const deletedDriver = await Driver.findById(driverId).populate(
      "assigned_packages"
    );

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    await Package.deleteMany({ _id: { $in: deletedDriver.assigned_packages } });

    const result = await Driver.deleteOne({ _id: driverId });

    await Statistics.updateOne(
      {},
      { $inc: { deleteCount: 1 } },
      { upsert: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting drivers", error });
  }
};

/**
 * Update a driver by ID.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the updated driver information or an error message.
 */

exports.updateDriverById = async (req, res) => {
  try {
    const { id, driver_license, driver_department } = req.body;

    // Validate request body
    if (!id || !driver_license || !driver_department) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { driver_license, driver_department },
      { new: true } // Return the updated driver
    );

    if (!updatedDriver) {
      return res.status(404).json({ status: "ID not found" });
    }

    await Statistics.updateOne(
      {},
      { $inc: { updateCount: 1 } },
      { upsert: true }
    );

    return res.status(200).json({ status: "Driver updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating drivers", error });
  }
};
