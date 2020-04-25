const mongoose = require ("mongoose");
const db = ("./models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

let workoutSeed = [
    {
        day: new Date().setDate(new Date().getDate()-10),
        exercises: [
            {
                type: "resistance",
                name: "tricep curl",
                duration: 5,
                weight: 30,
                reps: 10,
                sets: 3
            }
        ]
    },
    {
        day: new Date().setDate(new Date().getDate()-9),
        exercises: [
            { 
                type: "resistance",
                name: "shrugs",
                duration: 5,
                weight: 150,
                reps: 10,
                sets: 5
            }
        ]
    },
    {
        day: new Date().setDate(new Date().getDate() -8),
        exercises: [
            {
                type: "resistance",
                name: "good mornings",
                duration: 5,
                weight: 150,
                reps: 10,
                sets: 5
            }
        ]
    },
    {
        day: new Date().setDate(new Date().getDate() - 7),
        exercises: [{
            type: "resistance",
            name: "shoulder press",
            duration: 5,
            weight: 150,
            reps: 10,
            sets: 5
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 6),
        exercises: [{
            type: "resistance",
            name: "thrusters",
            duration: 5,
            weight: 150,
            reps: 10,
            sets: 5
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 5),
        exercises: [{
            type: "cardio",
            name: "running",
            duration: 30,
            distance: 10
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 4),
        exercises: [{
            type: "cardio",
            name: "biking",
            duration: 50,
            distance: 20
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 4),
        exercises: [{
            type: "resistance",
            name: "Dead lifts",
            duration: 15,
            weight: 250,
            reps: 5,
            sets: 5
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 3),
        exercises: [{
            type: "resistance",
            name: "squats",
            duration: 25,
            weight: 250,
            reps: 5,
            sets: 6
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 2),
        exercises: [{
            type: "resistance",
            name: "bicep curls",
            duration: 5,
            weight: 120,
            reps: 10,
            sets: 5
        }]
    },
    {
        day: new Date().setDate(new Date().getDate() - 1),
        exercises: [{
            type: "cardio",
            name: "swimming",
            duration: 50,
            distance: 2
        }]
    },
];

db.workout.deleteMany({})
.then(() => db.workout.collection.insertMany(workoutSeed))
.then(data => {
    console.log(data.result.n + " records added!");
    process.exit(0);
})
.catch (err => {
    console.error(err);
    process.exit(1);
});

