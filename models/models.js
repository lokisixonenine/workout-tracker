const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLogSchema = new Schema({

    day: {
            type: Date,
            default: () => new Date()
    },
        exercises: [{
        type: {
            type: String,
            trim: true,
            required: true
            },

        name: {
            type: String,                
            trim: true,
            required: true
            },

        duration: {
            type: Number,
            required: true
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