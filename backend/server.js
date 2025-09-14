const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const patientRouter = require("./router/patientRouter")
const doctorRouter = require("./router/doctorRouter")

const app = express(); // waa in app la sameeyaa ka hor inta aan la isticmaalin

// Middlewares
app.use(express.json());
app.use(cors()); // waa in la call gareeyo cors()

// Port
const PORT = process.env.PORT || 4000; // PORT waa in capital la sameeyo

// Database connection
mongoose.connect(process.env.db_Url)
.then(() => console.log(" Database connected..."))
.catch((err) => console.log(" Database connection error:", err));


// 
app.use(patientRouter)
app.use(doctorRouter)

// Start server
app.listen(PORT, () => console.log(` Server is running on port ${PORT}`));
