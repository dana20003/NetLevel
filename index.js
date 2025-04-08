const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS so the frontend can talk to the backend
app.use(cors());
app.use(express.json());

// AI scheduling route
app.post('/generate-schedule', (req, res) => {
  const { tasks, availableTime } = req.body;

  // Basic validation
  if (!tasks || !availableTime) {
    return res.status(400).json({ error: 'Missing tasks or available time.' });
  }

  let startHour = parseInt(availableTime.start.split(':')[0]);
  let endHour = parseInt(availableTime.end.split(':')[0]);
  let totalHours = endHour - startHour;

  let schedule = '';
  let hour = startHour;

  for (let task of tasks) {
    if (hour >= endHour) break; // Stop if time runs out

    const taskStart = `${hour}:00`;
    const taskEnd = `${hour + 1}:00`;
    schedule += `${taskStart} - ${taskEnd} → ${task.name} [${task.priority}]\n`;

    hour++;
  }

  res.json({ schedule });
});

// Start server
app.listen(port, () => {
  console.log(`✅ AI Scheduler running on http://localhost:${port}`);
});
