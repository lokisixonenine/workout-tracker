const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLogSchema = new Schema({

    day: {
                type: Date,
                default: Date.now()
    },
        exercises: [{
        type: {
            type: String,
            trim: true
            },

        name: {
            type: String,                
            trim: true
            },

        duration: {
            type: Number
            },

        reps: {
                type: Number
            },

            sets: {
                type: Number
            },

        weight: {
            type: Number
            }
        
        }]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userLogSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, exercises) => {
        return total + exercises.duration;
    }, 0);
});

const workout = mongoose.model("Workout", userLogSchema);

module.exports = workout;