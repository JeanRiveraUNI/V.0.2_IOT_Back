const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const v1workoutRouter = require('./v1/routes/workoutRoutes');
const v2taskRouter = require('./v2/routes/taskRoutes');
const v2userRouter = require('./v2/routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//routes
app.use(express.json())
app.use("/api/v1/workouts", v1workoutRouter); 
//routes tasks
app.use("/api/v2/tasks", v2taskRouter);

//routes users
app.use('/api/v2/users', v2userRouter);



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

//CORS
/*
app.use(cors());
var whitelist = ['http://localhost:8000/singup'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) === -1) { 
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.get('/', cors(corsOptions), (req, res) =>{
    res.send('Hello World');
});
*/


//Server
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`); 
});
