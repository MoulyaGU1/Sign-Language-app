const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => video.srcObject = stream)
.catch(err => alert("Error accessing webcam: " + err));

// Function to capture frame and send to Flask
function captureAndPredict() {
    ctx.drawImage(video, 0, 0, 64, 64);
    const dataURL = canvas.toDataURL("image/png");

    fetch("/predict", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({image: dataURL})
    })
    .then(res => res.json())
    .then(data => {
        if(data.prediction){
            document.getElementById("prediction").innerText = "Prediction: " + data.prediction;
            document.getElementById("confidence").innerText = "Confidence: " + data.confidence + "%";
        } else {
            document.getElementById("prediction").innerText = "Error: " + data.error;
            document.getElementById("confidence").innerText = "";
        }
    });
}

// Run every 500ms for live predictions
setInterval(captureAndPredict, 500);
// On load, check localStorage
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

// Toggle and save preference
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
