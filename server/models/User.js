const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      match: /^(\+\d{1,3}[- ]?)?\d{10}$/,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      default: "N/A",
    },
    dob: {
      type: String,
      trim: true,
      default: "N/A",
    },
    email: {
      type: String,
      trim: true,
      default: "N/A",
    },
    role: {
      type: String,
      default: "User",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    licenceNo: {
      type: String,
      default: "N/A",
    },
    aadhaarNo: {
      type: String,
      default: "N/A",
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

const data = [
  {
    category: "Bike",
    name: "Royal Enfield Classic 350",
    image: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5348.png",
    securityAmount: "100",
    speedLimit: "90",
    fuelType: "Petrol",
    transmissionType: "Geared",
    mileage: "15",
    fuelCapacity: "7L",
    cc: "350",
    status: "Active",
    priceForRent: [
      {
        price: 1400,
        distance: 250,
        fuelIncluded: false,
      },
      {
        price: 800,
        distance: 100,
        fuelIncluded: false,
      },
    ],
  },
  {
    category: "Bike",
    name: "Honda CB Shine",
    image: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5347.png",
    securityAmount: "100",
    speedLimit: "90",
    fuelType: "Petrol",
    transmissionType: "Geared",
    mileage: "50",
    fuelCapacity: "10L",
    cc: "125",
    status: "Active",
    priceForRent: [
      {
        price: 1000,
        distance: 250,
        fuelIncluded: false,
      },
      {
        price: 600,
        distance: 150,
        fuelIncluded: false,
      },
    ],
  },
  {
    category: "Bike",
    name: "Bajaj Pulsar 150",
    image: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5345.png",
    securityAmount: "100",
    speedLimit: "95",
    fuelType: "Petrol",
    transmissionType: "Geared",
    mileage: "45",
    fuelCapacity: "12L",
    cc: "150",
    status: "Active",
    priceForRent: [
      {
        price: 1200,
        distance: 250,
        fuelIncluded: false,
      },
      {
        price: 350,
        distance: 100,
        fuelIncluded: false,
      },
    ],
  },
  {
    category: "Bike",
    name: "Hero Splendor Plus",
    image: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5349.png",
    securityAmount: "100",
    speedLimit: "80",
    fuelType: "Petrol",
    transmissionType: "Geared",
    mileage: "55",
    fuelCapacity: "11L",
    cc: "100",
    status: "Active",
    priceForRent: [
      {
        price: 800,
        distance: 250,
        fuelIncluded: false,
      },
      {
        price: 60,
        distance: 150,
        fuelIncluded: false,
      },
    ],
  },
  {
    category: "Bike",
    name: "Yamaha FZS-FI",
    image: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5349.png",
    securityAmount: "100",
    speedLimit: "100",
    fuelType: "Petrol",
    transmissionType: "Geared",
    mileage: "40",
    fuelCapacity: "13L",
    cc: "150",
    status: "Active",
    priceForRent: [
      {
        price: 1100,
        distance: 200,
        fuelIncluded: true,
      },
      {
        price: 450,
        distance: 100,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Bike",
    name: "Suzuki Gixxer SF",
    image: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5343.png",
    securityAmount: "100",
    speedLimit: "100",
    fuelType: "Petrol",
    transmissionType: "Geared",
    mileage: "45",
    fuelCapacity: "12L",
    cc: "155",
    status: "Active",
    priceForRent: [
      {
        price: 1050,
        distance: 200,
        fuelIncluded: true,
      },
      {
        price: 400,
        distance: 100,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Scooter",
    name: "Honda Activa 6G",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11342.png",
    securityAmount: "75",
    speedLimit: "80",
    fuelType: "Petrol",
    transmissionType: "Gearless",
    mileage: "60",
    fuelCapacity: "5L",
    cc: "110",
    status: "Active",
    priceForRent: [
      {
        price: 900,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 350,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Scooter",
    name: "TVS Jupiter",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11340.png",
    securityAmount: "75",
    speedLimit: "85",
    fuelType: "Petrol",
    transmissionType: "Gearless",
    mileage: "55",
    fuelCapacity: "6L",
    cc: "110",
    status: "Active",
    priceForRent: [
      {
        price: 800,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 300,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Scooter",
    name: "Suzuki Access 125",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11337.png",
    securityAmount: "75",
    speedLimit: "90",
    fuelType: "Petrol",
    transmissionType: "Gearless",
    mileage: "50",
    fuelCapacity: "6L",
    cc: "125",
    status: "Active",
    priceForRent: [
      {
        price: 950,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 400,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Scooter",
    name: "Hero Maestro Edge 125",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11336.png",
    securityAmount: "75",
    speedLimit: "85",
    fuelType: "Petrol",
    transmissionType: "Gearless",
    mileage: "55",
    fuelCapacity: "5L",
    cc: "125",
    status: "Active",
    priceForRent: [
      {
        price: 850,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 350,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Scooter",
    name: "Yamaha Fascino 125",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11335.png",
    securityAmount: "75",
    speedLimit: "80",
    fuelType: "Petrol",
    transmissionType: "Gearless",
    mileage: "45",
    fuelCapacity: "5L",
    cc: "125",
    status: "Active",
    priceForRent: [
      {
        price: 1000,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 400,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "Scooter",
    name: "Aprilis SR 125",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11334.png",
    securityAmount: "75",
    speedLimit: "85",
    fuelType: "Petrol",
    transmissionType: "Gearless",
    mileage: "50",
    fuelCapacity: "6L",
    cc: "125",
    status: "Active",
    priceForRent: [
      {
        price: 1050,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 450,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "EV",
    name: "Ather 450X",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11305.png",
    securityAmount: "200",
    speedLimit: "80",
    fuelType: "Electric",
    transmissionType: "Gearless",
    mileage: "85",
    fuelCapacity: "3KWh",
    cc: "NA",
    status: "Active",
    priceForRent: [
      {
        price: 750,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 300,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "EV",
    name: "Bajaj Chetak",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11299.png",
    securityAmount: "200",
    speedLimit: "70",
    fuelType: "Electric",
    transmissionType: "Gearless",
    mileage: "90",
    fuelCapacity: "3KWh",
    cc: "NA",
    status: "Active",
    priceForRent: [
      {
        price: 700,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 275,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "EV",
    name: "Revolt RV400",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11298.png",
    securityAmount: "200",
    speedLimit: "85",
    fuelType: "Electric",
    transmissionType: "Gearless",
    mileage: "80",
    fuelCapacity: "4KWh",
    cc: "NA",
    status: "Active",
    priceForRent: [
      {
        price: 800,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 310,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "EV",
    name: "Ola Electric S1",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11281.png",
    securityAmount: "200",
    speedLimit: "75",
    fuelType: "Electric",
    transmissionType: "Gearless",
    mileage: "75",
    fuelCapacity: "3KWh",
    cc: "NA",
    status: "Active",
    priceForRent: [
      {
        price: 775,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 305,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "EV",
    name: "Simple One",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11296.png",
    securityAmount: "200",
    speedLimit: "80",
    fuelType: "Electric",
    transmissionType: "Gearless",
    mileage: "75",
    fuelCapacity: "3KWh",
    cc: "NA",
    status: "Active",
    priceForRent: [
      {
        price: 1650,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 650,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
  {
    category: "EV",
    name: "Tata Tigor EV",
    image: "https://pngimg.com/uploads/scooter/scooter_PNG11316.png",
    securityAmount: "200",
    speedLimit: "70",
    fuelType: "Electric",
    transmissionType: "Gearless",
    mileage: "80",
    fuelCapacity: "4KWh",
    cc: "NA",
    status: "Active",
    priceForRent: [
      {
        price: 1700,
        distance: 150,
        fuelIncluded: true,
      },
      {
        price: 680,
        distance: 75,
        fuelIncluded: true,
      },
    ],
  },
];
