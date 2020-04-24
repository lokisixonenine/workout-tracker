async function initWorkout() {
    const lastWorkout = await API.getPreviousWorkout();
    console.log("Last workout:", getPreviousWorkout);
    if(lastWorkout) {
        document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
        date: formatDate(lastWorkout.day),
        totalWorkoutDuration: lastWorkout.totalWorkoutDuration,
        numberOfExercises: lastWorkout.exercises.length,
        ...tallyExercises(lastWorkout.exercises)
    };
    
    renderWorkoutSummary(workoutSummary);
    } else {
        renderNoWorkout()
    }
}

function tallyExercises(exercises) {
    const tallied = exercises.reduce((acc, curr) => {
        if (curr.type === "resistance") {
            acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
            acc.totalSets = (acc.totalSets || 0) + curr.sets;
            acc.totalReps = (acc.totalRepts || 0) + curr.reps;
} else if (curr.type === "cardio") {
    acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
}
return acc;
}, {});
return tallied;
}

function formatDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
    const container = document.querySelector(".workout-stats");
    const workoutKeyMap = {
        date: "Date",
        totalWorkoutDuration: "Total Workout Duration",
        numberOfExercises: "Exercises Performed",
        totalWeight: "Total Weight Volume Lifted",
        totalSets: "Total Sets Performed",
        totalReps: "Total Reps Performed",
        totalDistance: "Total Distance Travelled"
    };

    Object.keys(summary).forEach(key => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = workoutKeyMap[key];
        const TextNode = document.createTextNode(`: ${summary[key]}`);

        p.appendChild(strong);
        p.appendChild(TextNode);
    });
}

function renderWorkoutText() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You haven't created a workout yet."

    p.appendChild(strong);
    container.appendChild(p);
}

initWorkout();