const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Cars = require('../../models.js/dealer/DealerCars');
const SoldCars = require('../../models.js/SoldCars');
const Dealer = require('../../models.js/dealer/Dealers');
const fetchuser = require('../../middleware/fetchuser');



router.post('/car-deal', fetchuser, async (req, res) => {
  try {
    const { carId } = req.body
    const car = await Cars.find({ _id: carId });
    const purchasedCar = new SoldCars({ userId: req.user.id, carId: carId, sellerId: car[0].sellerId, product: car });
    const savedCar = await purchasedCar.save();
    await Dealer.updateOne({_id: car[0].sellerId}, {$push:{sold_cars: carId}});
    res.json({ success: true, savedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get("/get-bookings", fetchuser, async (req, res) => {
  try {
    const allBookings = await SoldCars.find({ userId: req.user.id });
    res.json(allBookings);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


router.delete('/cancel-booking', fetchuser, async (req, res) => {
  try {
    const { bookingId } = req.body;
    await SoldCars.deleteOne({ _id: bookingId });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;