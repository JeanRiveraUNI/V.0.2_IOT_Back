const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import rutas 
const v1workoutRouter = require('./v1/routes/workoutRoutes');
const v2taskRouter = require('./v2/routes/taskRoutes');
const v2userRouter = require('./v2/routes/userRoutes');
const v2parkingRouter = require('./v2/routes/parkingRoutes');
const v2reservationRouter = require('./v2/routes/reservationRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes workouts
app.use("/api/v1/workouts", v1workoutRouter); 

//routes tasks
app.use("/api/v2/tasks", v2taskRouter);

//routes users
app.use('/api/v2/users', v2userRouter);

//routes parkings
app.use('/api/v2/parkings', v2parkingRouter);

//routes reservations
app.use('/api/v2/reservations', v2reservationRouter);

//routes authentication
/*
if (!process.env.JWT_SECRET) {
    console.error('la variable JWT_SECRET no está configurada');
    process.exit(1);
}
*/

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
//actualizacion 10/12
//-------------------------------------------------------------------


//Server
app.listen(PORT, () => { 
    console.log(`Server is running on port 'http://localhost:${PORT}'`); 
});

//CORS
/*
app.use(cors());
var whitelist = ['http://localhost:8000/registro'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) { 
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