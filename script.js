// Function to update the current time in milliseconds
function updateTime() {
  const timeElement = document.getElementById("currentTime");
  timeElement.textContent = Date.now();
}

// Update time immediately when page loads
updateTime();

// Update time every second (1000 milliseconds)
setInterval(updateTime, 1000);
