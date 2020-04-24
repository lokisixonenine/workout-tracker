import { chartreuse } from "color-name";

fetch ("/api/workout/range")
.then(response => {
    return response.json();
})
.then(data => {
    populateChart(data);
});

API.getWorkoutsWithinRange() 
function generateColorPalette() {
    const colorArray = [
            "#003f5c",
            "#2f4b7c",
            "#665191",
            "#a05195",
            "#d45087",
            "#f95d6a",
            "#ff7c43",
            "ffa600",
            "#003f5c",
            "#2f4b7c",
            "#665191",
            "#a05195",
            "#d45087",
            "#f95d6a",
            "#ff7c43",
            "ffa600"
    ]

    return colorArray;

    }

    function populateChart(data) {
        let durations = duration(data);
        let pounds = calculateTotalWeight(data);
        let workouts =  workoutNames(data);
        let colors = generateColorPalette();
        let line = document.querySelector("#canvas").getContext("2d");
        let bar = document.querySelector("#canvas2").getContext("2d");
        let pie = document.querySelector("#canvas3").getContext("2d");
        let pie2 = document.querySelector("#canvas4").getContext("2d");
        let lineChart = new Chart(line, {
            type: "line",
            data: {
                labels: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday", 
                    "Friday",
                    "Saturday"
                ],
                datasets: [
                    {
                        label: "Workout Duration in Minutes",
                        backgroundColor: "red",
                        borderColor: "red",
                        data: durations,
                        fill: false
                    }
                ]
            },

            options: {
                responsive: true,
                title: {
                    display: true
                },
                scales: {
                    xAxis: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true
                            }
                        }
                    ]
                }
            }
        });

        let barChart = newChart(bar, {
            type: "bar",
            data: {
                labels: [
                    "Sunday", 
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                datasets: [
                    {
                        label: "Pounds",
                        data: pounds,
                        backgroundColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                        "rgba(75, 192, 192, 0.2)",
                                        "rgba(153, 102, 255, 0.2)",
                                        "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                        "rgba(75, 192, 192, 0.2)",
                                        "rgba(153, 102, 255, 0.2)",
                                        "rgba(255, 159, 64, 0.2)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text:"Pounds Lifted/Volume Lifted"
                },
                scales: {
                    yAxis: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });

        let pieChart = new Chart(pie, {
            type: "pie",
            data: {
                labels: workouts,
                datasets: [
                    {
                        label: "Exercises Performed",
                        backgroundColor: colors,
                        data: durations
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text:"Exercises Performed"
                }
            }
        });

        let donutChart = new Chart(pie2, {
            type: "doughnut",
            data: {
                labels: workouts,
                datasets: [
                    {
                        label: "Exercises Performed",
                        backgroundColor: colors,
                        data: pounds
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "Exercises Performed"
                }
            }
        });
    }

    function duration(data) {
        let durations = [];

        data.forEach(workout => {
            workout.exercises.forEach(exercise => {
                durations.push(exercise.duration);
            });
        });

        return durations;

    }   

    function calculateTotalWeight(data) {
        let total = [];

        data.forEach(workout => {
            workout.exercises.forEach(exercise => {
                total.push(exercise.weight);
            });
        });

        return total;
    }
    
    function workoutNames(data) {
        let workouts = [];

        data.forEach(workout => {
            workout.exercises.forEach(exercise => {
                workouts.push(exercise.name);
            });
        });

    return workouts;

    }
            