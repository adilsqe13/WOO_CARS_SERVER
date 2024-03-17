require('dotenv').config();
const express = require('express');
const router = express.Router();
const DealerCars = require('../../models.js/dealer/DealerCars');
const Dealer = require('../../models.js/dealer/Dealers');
const SoldCars = require('../../models.js/SoldCars');
const fetchdealer = require('../../middleware/fetchdealer');
const cloudinary = require('cloudinary').v2;


router.put("/update-car", fetchdealer, async (req, res) => {
  try {
    const { carId, vehicle_model, vehicle_number, price, seating_capacity, public_id, imageUrl } = req.body;
    if (imageUrl !== undefined) {
      await DealerCars.updateOne({ _id: carId }, { $set: { vehicle_model: vehicle_model, vehicle_number: vehicle_number, seating_capacity: seating_capacity, price: price, image: imageUrl, public_id: public_id } });
      const rentedCar = await SoldCars.findOne({ carId: carId });
      if (rentedCar) {
        const car = rentedCar.product[0];
        car.vehicle_model = vehicle_model;
        car.vehicle_number = vehicle_number;
        car.seating_capacity = seating_capacity;
        car.price = price;
        car.public_id = public_id;
        car.image = imageUrl;
        await SoldCars.updateOne({ carId: carId }, { $set: { product: [car] } });
      }
      res.json({ success: true });
    } else {
      await DealerCars.updateOne({ _id: carId }, { $set: { vehicle_model: vehicle_model, vehicle_number: vehicle_number, seating_capacity: seating_capacity, price: price } });
      const rentedCar = await SoldCars.findOne({ carId: carId });
      if (rentedCar) {
        const car = rentedCar.product[0];
        car.vehicle_model = vehicle_model;
        car.vehicle_number = vehicle_number;
        car.seating_capacity = seating_capacity;
        car.price = price;
        await SoldCars.updateOne({ carId: carId }, { $set: { product: [car] } });
      }
      res.json({ success: true });
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})


router.post('/add-product', fetchdealer, async (req, res) => {
  try {
    const { vehicle_model, vehicle_number, seating_capacity, price, imageUrl, public_id, agencyName } = req.body
    const product = new DealerCars({
      image: imageUrl, public_id, vehicle_model, vehicle_number, seating_capacity, price, sellerId: req.seller.id, agencyName: agencyName
    })
    const saveProduct = await product.save();
    await Dealer.updateOne({_id: req.seller.id},{$push:{cars: saveProduct._id}});
    res.json({ success: true, saveProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get("/get-orders", fetchdealer, async (req, res) => {
  try {
    const allOrders = await SoldCars.find({ sellerId: req.seller.id });
    res.json(allOrders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


router.get("/get-my-cars", fetchdealer, async (req, res) => {
  try {
    const myCars = await DealerCars.find({ sellerId: req.seller.id });
    res.json(myCars);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});



router.delete("/delete-car", fetchdealer, async (req, res) => {
  try {
    const { carId } = req.body;
    const public_id = (await DealerCars.findOne({ _id: carId })).public_id;
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    await DealerCars.deleteOne({ _id: carId });
    await SoldCars.deleteOne({ carId: carId });
    await Dealer.updateOne({ _Id: req.seller.id },{$pop:{cars: carId}});
    await cloudinary.uploader.destroy(public_id);
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});



router.put('/order-confirm', fetchdealer, async (req, res) => {
  try {
    const { orderId } = req.body
    await SoldCars.updateOne({ _id: orderId }, { $set: { order_status: 'Confirmed' } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/car-details/:carId', fetchdealer, async (req, res) => {
  try {
    const carId = req.params.carId;
    const carDetails = await DealerCars.find({ _id: carId });
    res.json(carDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/get-sold-cars', fetchdealer, async (req, res) => {
  try {
    const cars = await SoldCars.find({sellerId: req.seller.id});
    res.json(cars.reverse());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;