import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  // Default times (seconds)
  const DEFAULT_WORK_TIME = 25 * 60;
  const DEFAULT_BREAK_TIME = 5 * 60;

  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);

  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Task list
  const [task, setTask] = useState("");
  const [currentTask, setCurrentTask] = useState("");

  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft < 0) {
      if (onBreak) {
        // Break over → start work
        setTimeLeft(workTime);
        setOnBreak(false);
        notify("Break over! Focus time starts now.");
      } else {
        // Work session complete → break
        setSessionsCompleted((prev) => prev + 1);
        setTimeLeft(breakTime);
        setOnBreak(true);
        notify("Work session complete! Time for a break.");
      }
    }
  }, [timeLeft]);

  // Notification
  const notify = (message) => {
    if (Notification.permission === "granted") {
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") new Notification(message);
      });
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = onBreak
    ? ((breakTime - timeLeft) / breakTime) * 100
    : ((workTime - timeLeft) / workTime) * 100;

  // Start timer for selected task
  const startTask = () => {
    if (!task) return alert("Please enter a task!");
    setCurrentTask(task);
    setTask("");
    setTimeLeft(workTime);
    setOnBreak(false);
    setIsRunning(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-2xl font-bold">{onBreak ? "Break Time" : "Focus Time"}</h2>

      {currentTask && (
        <div className="text-gray-700 font-semibold mb-2">Current Task: {currentTask}</div>
      )}

      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={isRunning}
      />

      {!isRunning && (
        <button
          onClick={startTask}
          className="px-6 py-2 mt-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Start Task
        </button>
      )}

      <div className="text-5xl font-mono">{formatTime(Math.max(timeLeft, 0))}</div>

      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className={`h-4 ${onBreak ? "bg-green-500" : "bg-blue-500"}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {isRunning && (
        <button
          onClick={() => setIsRunning(false)}
          className="px-6 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
        >
          Pause
        </button>
      )}

      <div className="mt-2 text-gray-700">
        Completed Sessions: <span className="font-bold">{sessionsCompleted}</span>
      </div>

      {/* Optional: Customize times */}
      <div className="flex justify-between mt-4 space-x-2 text-sm">
        <div>
          <label className="mr-1">Work (min):</label>
          <input
            type="number"
            min={1}
            value={workTime / 60}
            onChange={(e) => setWorkTime(e.target.value * 60)}
            className="w-16 px-2 rounded-md text-black"
            disabled={isRunning}
          />
        </div>
        <div>
          <label className="mr-1">Break (min):</label>
          <input
            type="number"
            min={1}
            value={breakTime / 60}
            onChange={(e) => setBreakTime(e.target.value * 60)}
            className="w-16 px-2 rounded-md text-black"
            disabled={isRunning}
          />
        </div>
      </div>
    </div>
  );
}
