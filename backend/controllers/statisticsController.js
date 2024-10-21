const Statistics = require("../models/statistics");
const Driver = require("../models/driver");
const Package = require("../models/package"); 

exports.getAppStatistics = async (req, res) => {
  try {
    const statistics = await Statistics.findOne({});
    const driversCount = await Driver.countDocuments();
    const packagesCount = await Package.countDocuments();

    res.status(200).json({
      insert: statistics ? statistics.insertCount : 0,
      delete: statistics ? statistics.deleteCount : 0,
      update: statistics ? statistics.updateCount : 0,
      retrieve: statistics ? statistics.retrieveCount : 0,
      drivers: driversCount,
      packages: packagesCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving statistics" });
  }
};
