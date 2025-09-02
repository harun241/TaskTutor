import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  const WORK_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const timerRef = useRef(null);

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
        // Break over, start work session
        setTimeLeft(WORK_TIME);
        setOnBreak(false);
      } else {
        // Work session complete
        setSessionsCompleted((prev) => prev + 1);
        setTimeLeft(BREAK_TIME);
        setOnBreak(true);
      }
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPercent = onBreak
    ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100
    : ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-2xl font-bold">{onBreak ? "Break Time" : "Focus Time"}</h2>
      <div className="text-5xl font-mono">{formatTime(Math.max(timeLeft, 0))}</div>

      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
        <div
          className={`h-4 ${onBreak ? "bg-green-500" : "bg-blue-500"}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="px-6 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <div className="mt-2 text-gray-700">
        Completed Sessions: <span className="font-bold">{sessionsCompleted}</span>
      </div>
    </div>
  );
}
