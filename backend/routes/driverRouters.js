/**
 * Routes for handling driver-related operations.
 *
 * @requires express - Express framework.
 * @requires driverController - The driver controller handling driver CRUD operations.
 */

const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverControllers");

/**
 * Route to create a new driver.
 * @name POST /add
 * @function
 */

router.post("/add", driverController.createDriver);

/**
 * Route to get all drivers.
 * @name GET /
 * @function
 */

router.get("/", driverController.getAllDrivers);

/**
 * Route to delete a driver by ID.
 * @name DELETE /delete
 * @function
 */

router.delete("/delete", driverController.deleteDriverById);

/**
 * Route to update a driver by ID.
 * @name PUT /update
 * @function
 */

router.put("/update", driverController.updateDriverById);

module.exports = router;
