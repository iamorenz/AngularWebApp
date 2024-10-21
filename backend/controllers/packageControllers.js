/**
 * Controller for handling package-related operations.
 *
 * @requires Package - The Package model.
 * @requires Driver - The Driver model.
 */

const Package = require("../models/package");
const Driver = require("../models/driver");
const Statistics = require("../models/statistics");

/**
 * Create a new package.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the created package ID or an error message.
 */

exports.createPackage = async (req, res) => {
  try {
    const {
      package_title,
      package_weight,
      package_destination,
      package_description,
      package_isAllocated,
      driver_id,
    } = req.body;

    const newPackage = new Package({
      package_title,
      package_weight,
      package_destination,
      package_description,
      package_isAllocated,
      driver_id,
    });

    const savedPackage = await newPackage.save();

    // Update corresponding driver to include the package in assigned_packages
    const relatedDriver = await Driver.findByIdAndUpdate(
      driver_id,
      { $push: { assigned_packages: savedPackage._id } },
      { new: true }
    );

    if (!relatedDriver) {
      return res
        .status(404)
        .json({ message: "Driver not found to assign package" });
    }

    await Statistics.updateOne(
      {},
      { $inc: { insertCount: 1 } },
      { upsert: true }
    );

    return res
      .status(201)
      .json({ id: savedPackage._id, package_id: savedPackage.package_id });
  } catch (error) {
    return res.status(400).json({ message: "Error adding package", error });
  }
};

/**
 * Get all packages.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with a list of all packages or an error message.
 */

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).populate('driver_id');

    await Statistics.updateOne(
      {},
      { $inc: { retrieveCount: 1 } },
      { upsert: true }
    );

    res.status(200).json(packages);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error retrieving packages", error });
  }
};

/**
 * Delete a package by ID.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the result of the deletion or an error message.
 */

exports.deletePackageById = async (req, res) => {
  try {
    const packageId = req.query.id;

    await Driver.updateMany(
      { assigned_packages: packageId },
      { $pull: { assigned_packages: packageId } }
    );

    const result = await Package.deleteOne({ _id: packageId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    await Statistics.updateOne(
      {},
      { $inc: { deleteCount: 1 } },
      { upsert: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting package", error });
  }
};

/**
 * Update a package by ID.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the updated package information or an error message.
 */

exports.updatePackageById = async (req, res) => {
  try {
    const { package_id, package_destination } = req.body;

    if (!package_id || !package_destination) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      package_id,
      { package_destination },
      { new: true } // Return the updated package
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    await Statistics.updateOne(
      {},
      { $inc: { updateCount: 1 } },
      { upsert: true }
    );

    return res.status(200).json({ status: "updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating package", error });
  }
};
