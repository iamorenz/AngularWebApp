/**
 * Routes for handling package-related operations.
 *
 * @requires express - Express framework.
 * @requires packageController - The package controller handling package CRUD operations.
 */

const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageControllers");

/**
 * Route to create a new package.
 * @name POST /add
 * @function
 */
router.post("/add", packageController.createPackage);

/**
 * Route to get all packages.
 * @name GET /
 * @function
 */
router.get("/", packageController.getAllPackages);

/**
 * Route to delete a package by ID.
 * @name DELETE /delete
 * @function
 */
router.delete("/delete", packageController.deletePackageById);

/**
 * Route to update a package by ID.
 * @name PUT /update
 * @function
 */
router.put("/update", packageController.updatePackageById);

module.exports = router;
