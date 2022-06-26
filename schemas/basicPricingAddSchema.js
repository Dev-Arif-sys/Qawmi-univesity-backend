const mongoose = require("mongoose");
const basicPricingAddSchema = mongoose.Schema(
  {
    pricingAmount: {
      type: Number,
      required: [true, "Please provide a pricing amount"],
    },

    firstBasicFacility: {
      type: String,
      required: [true, "Please provide first basic facility"],
    },
    secondBasicFacility: {
      type: String,
      required: [true, "Please provide second basic facility"],
    },
    thirdBasicFacility: {
      type: String,
      required: [true, "Please provide third basic facility"],
    },
    fourthBasicFacility: {
      type: String,
    },
    fifthBasicFacility: {
      type: String,
    },
    sixthhBasicFacility: {
      type: String,
    },

    basicPricingDescription: {
      type: String,
      required: [true, "Please provide description of the basic pricing"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BasicPricingAdd", basicPricingAddSchema);
