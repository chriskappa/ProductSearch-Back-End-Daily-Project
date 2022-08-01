const mongoose = require("mongoose");
const statisticSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  views: {
    required: true,
    type: Number,
  },
  clicks: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const statisticModel = mongoose.model("Statistic", statisticSchema);

module.exports = statisticModel;
