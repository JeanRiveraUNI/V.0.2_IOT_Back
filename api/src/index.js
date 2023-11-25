const express = require('express');
const v1workoutRouter = require('./v1/routes/workoutRoutes');
const v1taskRouter = require('./v1/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/v1/workouts", v1workoutRouter); 
app.use("/api/v1/tasks", v1taskRouter);

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`); 
});
