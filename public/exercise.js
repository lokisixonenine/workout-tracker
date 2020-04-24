// this file creates the various components that make up the exercises used in this app
const workoutTypeSelect = document.querySelector("#type");
const cardio = document.querySelector(".cardio");
const resistance = document.querySelector(".resistance");
const cardioExerciseName = document.querySelector(".cardio-name");
const inputName = document.querySelector("#name");
const weightAmount = document.querySelector("#weight");
const numberOfSets = document.querySelector("#sets");
const numberOfReps = document.querySelector("reps");
const cardioDuration = document.querySelector("#duration");
const resistanceDuration = document.querySelector("resistance-duration");
const cardioDistance = document.querySelector("#distance");
const workoutComplete = document.querySelector("button.complete");
const addAnotherExercise = document.querySelector("button.add-exercise");
const toast = document.querySelector("#toast");
const addNewWorkout = document.querySelector(".new-workout");

let workoutType = null;
let leaveWorkout = false;

async function initExercise() {
    let workout;

    if (location.search.split("=")[1] === undefined) {
        workout = await API.createWorkout()
        console.log(workout)
    }

    if (workout) {
        location.search = "?id" + workout._id;
    }
}

initExercise();
function handleWorkoutTypeChange(event) {
    workoutTypeSelect = event.target.value;
    if (workoutTypeSelect === "cardio") {
        cardio.classList.remove("d-none");
        resistance.classList.add("d-none");
    } else if (workoutType === "resistance") {
        resistance.classList.remove("d-none");
        cardio.classList.add("d-none");
    } else {
        cardio.classList.add("d-none");
        resistance.classList.add("d-none");
    }
    validateInputs();
}

function validateInputs() {
    let isValid = true;

    if (workoutTypeSelect === "resistance") {
        if(inputName.value.trim() === "") {
            isValid = false;
        }
    
    if (weightAmount.value.trim() === "") {
        isValid = false;
    }

    if (numberOfSets.value.trim() === "") {
        isValid = false;
    }

    if (numberOfReps.value.trim() === "") {
        isValid = false;
    }

    if (resistanceDuration.value.trim() === "") {
        isValid = false;
    }
} else if (workoutTypeSelect === "cardio") {
    if (cardioExerciseName.value.trim() === "") {
        isValid = false;
    }

    if (cardioDuration.value.trim() === "") {
        isValid = false;
    }

    if (cardioDistance.value.trim() === "") {
        isValid = false;
    }
}

    if (isValid) {
        workoutComplete.removeAttribute("disabled");
        addAnotherExercise.removeAttribute("disabled");
    } else {
        workoutComplete.setAttribute("disabled", true);
        addAnotherExercise.removeAttribute("disabled", true);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    let workoutData = {};

    if (workoutData.type === "cardio") {
        workoutData.name = cardioExerciseName.value.trim();
        workoutData.distance = Number(cardioDistance.value.trim());
        workoutData.duration = Number(cardioDuration.value.trim());
    } else if (workoutTypeSelect === "resistance") {
        workoutData.type = "resistance";
        workoutData.name = inputName.value.trim();
        workoutData.weight = Number(weightAmount.value.trim());
        workoutData.sets = Number(numberOfSets.value.trim());
        workoutData.reps = Number(numberOfReps.value.trim());
        workoutData.duration = Number(resistanceDuration.value.trim());
        }

    await API.addNewExercise(workoutData);
    clearInputs();
    toast.classList.add("Success!");
    
    }

    function handleToastAnimationEnd() {
        toast.removeAttribute("class");
        if (addNewWorkout) {
            location.href = "/";
        }
    }

    function clearInputs() {
        cardioExerciseName.value = "";
        inputName.value = "";
        numberOfSets.value = "";
        cardioDistance.value = "";
        cardioDuration.value = "";
        numberOfReps.value = "";
        numberOfSets.value = "";
        resistanceDuration.value = "";
        weightAmount.value = "";
    }

    if (workoutTypeSelect) {
        workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
    }
    if (workoutComplete) {
        workoutComplete.addEventListener("click", function (event) {
            leaveWorkout = true;
            handleWorkoutTypeChange(event);
        });
    }
    if(addNewWorkout) {
        addNewWorkout.addEventListener("click", handleFormSubmit);
    }
    toast.addEventListener("animationend", handleToastAnimationEnd);

    document
    .querySelectorAll("input")
    .forEach(element => element.addEventListener("input", validateInputs));
