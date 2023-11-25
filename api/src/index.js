const express = require('express');
const mongoose = require('mongoose');
const v1workoutRouter = require('./v1/routes/workoutRoutes');
const v2taskRouter = require('./v2/routes/taskRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

//routes
app.use(express.json())
app.use("/api/v1/workouts", v1workoutRouter); 
app.use("/api/v2/tasks", v2taskRouter);


//MongoDB connection
mongoose.connect(
    process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB Atlas successfully!");
    })
    .catch((err) => {
         console.error("Error connecting to MongoDB Atlas:", err);
    }
);


app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`); 
});
