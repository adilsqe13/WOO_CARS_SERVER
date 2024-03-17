const express = require('express');
const router = express.Router();
const Dealers = require('../../models.js/dealer/Dealers');
const Customers = require('../../models.js/user/UserProfile');
const Cars = require('../../models.js/dealer/DealerCars');


router.get("/get-all-dealers", async (req, res) => {
  try {
    const allDealers = await Dealers.find();
    res.json(allDealers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-all-customers", async (req, res) => {
  try {
    const allCustomers = await Customers.find();
    res.json(allCustomers);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-total-cars", async (req, res) => {
  try {
    const cars = await Cars.find();
    res.json(cars);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;