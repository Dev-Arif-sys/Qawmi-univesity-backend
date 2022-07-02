const mongoose = require("mongoose");
const pricingAddSchema = mongoose.Schema({
  intro: {
    introPricingAmount: Number,
    introPricingFirstFacility: String,
    introPricingSecondFacility: String,
    introPricingThirdFacility: String,
    introPricingFourthFacility: String,
    introPricingFifthFacility: String,
    introPricingSixthFacility: String,
    introPricingDesc: String,
  },

  pro: {
    proPricingAmount: Number,
    proPricingFirstFacility: String,
    proPricingSecondFacility: String,
    proPricingThirdFacility: String,
    proPricingFourthFacility: String,
    proPricingFifthFacility: String,
    proPricingSixthFacility: String,
    proPricingDesc: String,
  },

  base: {
    basicPricingAmount: Number,
    basicPricingFirstFacility: String,
    basicPricingSecondFacility: String,
    basicPricingThirdFacility: String,
    basicPricingFourthFacility: String,
    basicPricingFifthFacility: String,
    basicPricingSixthFacility: String,
    basicPricingDesc: String,
  },
});

module.exports = mongoose.model("PricingAdd", pricingAddSchema);
