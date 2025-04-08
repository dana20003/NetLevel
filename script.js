


document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
    displayArrangedTasks();
    displayTemplates();
    updateProgress();
});

// Global Variables (Persisted in Local Storage)
let userLevel = parseInt(localStorage.getItem("userLevel")) || 1;
let rewardCount = parseInt(localStorage.getItem("rewardCount")) || 0;
const rewardsPerLevel = 5; // Number of rewards needed to level up

// Select elements where the level and reward count appear
const userLevelDisplay = document.getElementById("user-level");
const rewardCountDisplay = document.getElementById("reward-count");

// Function to update the UI with the latest level and reward count
function updateUI() {
    userLevelDisplay.innerText = userLevel;
    rewardCountDisplay.innerText = rewardCount;
}

// Load saved progress on page load
document.addEventListener("DOMContentLoaded", function () {
    updateUI(); // 🔥 Ensure UI reflects stored values
});

// Function to grant rewards
function giveReward() {
    rewardCount++; // Increase reward count
    localStorage.setItem("rewardCount", rewardCount); // Save to localStorage
    updateUI(); // 🔥 Update the screen with new reward count

    console.log(`🎉 You earned a reward! Total rewards: ${rewardCount}`);

    checkLevelUp(); // Check if the user levels up
}

// Function to check and update user level
function checkLevelUp() {
    if (rewardCount >= rewardsPerLevel) {
        userLevel++;
        rewardCount = 0; // Reset reward count after leveling up
        localStorage.setItem("userLevel", userLevel);
        localStorage.setItem("rewardCount", rewardCount);
        alert(`🔥 Congrats! You've leveled up to Level ${userLevel}`);

        updateUI(); // 🔥 Update UI after leveling up
    }
}




// Function to add a task
function addTask() {
    const name = document.getElementById("task-name").value;
    const priority = document.getElementById("task-priority").value;
    const duration = parseInt(document.getElementById("task-duration").value);

    if (!name || !duration) {
        alert("Please enter both task name and duration!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name, priority, duration, completed: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById("task-list");
    if (!taskList) return;

    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Sorting tasks by priority (High → Medium → Low)
    tasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item", task.priority.toLowerCase());
        if (task.completed) taskItem.classList.add("completed");

        taskItem.innerHTML = `
            <span>${task.name} (${task.priority}) - ${task.duration} mins</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateProgress();
}

// Function to delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}


document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("preferences-form")) { 
        loadPreferences();
        document.getElementById("save-button").addEventListener("click", savePreferences);
    }
});

function savePreferences() {
    const selected = [];

    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.id !== "other-checkbox") { 
            selected.push(checkbox.value); // Add selected preferences, excluding "Other"
        }
    });

    // Handle the custom reward input
    const customRewardInput = document.getElementById('custom-reward');
    if (document.getElementById('other-checkbox').checked && customRewardInput.value.trim()) {
        selected.push(customRewardInput.value.trim()); // Add only the user's custom reward
    }

    if (selected.length === 0) {
        alert("⚠️ Please select at least one reward.");
        return;
    }

    // Store preferences
    localStorage.setItem("preferences", JSON.stringify(selected));

    alert("✅ Preferences saved successfully!");
    window.location.href = "dashboard.html"; // Redirect to the dashboard
}


// Function to get user preferences
function getUserPreferences() {
    return JSON.parse(localStorage.getItem("preferences")) || [];
}

// Function to give a reward based on user preferences
function giveReward() {
    let preferences = getUserPreferences();

    if (preferences.length === 0) {
        alert("No rewards selected! Please choose your preferences in settings.");
        return;
    }

    // Select a random reward from user preferences
    let randomReward = preferences[Math.floor(Math.random() * preferences.length)];

    rewardCount++;
    localStorage.setItem("rewardCount", rewardCount);

    alert(`🎉 You earned a reward: ${randomReward}!`);
    checkLevelUp();
}

// Function to show final reward when all tasks are complete
function showFinalReward() {
    let preferences = getUserPreferences();

    if (preferences.length === 0) {
        alert("🎉 You've completed all tasks! But no reward is set.");
        return;
    }

    let finalReward = preferences[Math.floor(Math.random() * preferences.length)];
    alert(`🎉 You've completed all tasks! Enjoy your final reward: ${finalReward}`);
}





// Function to check if all tasks are completed
function checkAllTasksCompleted() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = tasks.filter(task => task.completed).length;

    if (completedTasks === tasks.length && tasks.length > 0) {
        showFinalReward();  // Trigger the final reward when all tasks are completed
    }
}

// Function to toggle task completion and reward progress
function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let completedTasks = tasks.filter(task => task.completed).length;

    if (completedTasks % 2 === 0) {  // Give reward every 2 completed tasks
        giveReward();
    }

    if (completedTasks === tasks.length && tasks.length > 0) {
        showFinalReward();
    }

    displayTasks();
}



// Function to arrange tasks by priority and schedule them
function arrangeTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
        alert("❌ No tasks to arrange! Please add tasks first.");
        return;
    }

    tasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    let startTimeInput = document.getElementById("start-time");
    if (!startTimeInput || !startTimeInput.value) {
        alert("⚠️ Please select a start time before arranging tasks!");
        return;
    }

    let [hours, minutes] = startTimeInput.value.split(":").map(Number);
    let currentTime = new Date();
    currentTime.setHours(hours, minutes, 0, 0);

    let addBreaks = document.getElementById("add-breaks")?.checked || false;
    let schedule = [];

    tasks.forEach((task, index) => {
        let endTime = new Date(currentTime.getTime() + task.duration * 60000);

        schedule.push({
            name: task.name,
            priority: task.priority,
            startTime: formatTime(currentTime),
            endTime: formatTime(endTime),
            duration: task.duration
        });

        currentTime = new Date(endTime);

        if (addBreaks && index < tasks.length - 1) {
            currentTime.setMinutes(currentTime.getMinutes() + 10);
        }
    });

    localStorage.setItem("arrangedTasks", JSON.stringify(schedule));
    displayArrangedTasks();
}

// Helper function to format time (HH:MM AM/PM)
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

// Function to display arranged tasks
function displayArrangedTasks() {
    const arrangedList = document.getElementById("arranged-task-list");
    if (!arrangedList) return;

    arrangedList.innerHTML = "";
    let schedule = JSON.parse(localStorage.getItem("arrangedTasks")) || [];

    if (schedule.length === 0) {
        arrangedList.innerHTML = "<li>No tasks have been arranged yet.</li>";
        return;
    }

    schedule.forEach((task) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${task.name} (${task.priority})</strong>  
                        <br> ⏰ ${task.startTime} - ${task.endTime} (${task.duration} mins)`;
        arrangedList.appendChild(li);
    });
}

// Function to update task progress bar
function updateProgress() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    if (totalTasks === 0) return;

    const progressPercent = (completedTasks / totalTasks) * 100;
    document.getElementById("progress-fill").style.width = `${progressPercent}%`;
    document.getElementById("progress-text").textContent = `Completed ${completedTasks} out of ${totalTasks} tasks`;
}

async function generateSchedule() {
    const tasks = [
      { name: "Study Math", duration: 60, priority: "high" },
      { name: "Watch Lecture", duration: 45, priority: "medium" },
      { name: "Clean Room", duration: 30, priority: "low" }
    ];
  
    const availableTime = { start: "9:00", end: "14:00" };
  
    try {
      const res = await fetch("http://localhost:3000/generate-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tasks, availableTime })
      });
  
      const data = await res.json();
      document.getElementById("ai-schedule").textContent = data.schedule;
    } catch (err) {
      document.getElementById("ai-schedule").textContent = "Error fetching schedule.";
      console.error(err);
    }
  }
  