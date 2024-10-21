const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  insertCount: { type: Number, default: 0 },
  deleteCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 },
  retrieveCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Statistics", statisticsSchema);
