import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);

  const addHabit = () => {
    if (input.trim() === "") return;

    setHabits([
      ...habits,
      { id: Date.now(), name: input, done: false }
    ]);

    setInput("");
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const data = [
    { name: "Completed", value: habits.filter(h => h.done).length },
    { name: "Pending", value: habits.filter(h => !h.done).length }
  ];

  return (
    <div
      style={{
        padding: "20px",
        background: dark ? "#222" : "#fff",
        color: dark ? "#fff" : "#000",
        minHeight: "100vh"
      }}
    >
      <h1>AI Habit Tracker 🚀</h1>

      <button onClick={() => setDark(!dark)}>
        Toggle Dark Mode 🌙
      </button>

      <p>Track your daily habits and stay productive!</p>

      <input
        type="text"
        placeholder="Enter habit"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addHabit} style={{ marginLeft: "10px" }}>
        Add Habit
      </button>

      {/* AI Suggestion */}
      {input.length > 5 && (
        <p>💡 Suggestion: Try doing this habit daily at same time!</p>
      )}

      <h2>Your Habits:</h2>

      {habits.length === 0 ? (
        <p>No habits added yet</p>
      ) : (
        habits.map((habit) => (
          <div key={habit.id} style={{ marginBottom: "10px" }}>
            {habit.name} - {habit.done ? "✅ Done" : "❌ Pending"}

            <button
              onClick={() => toggleHabit(habit.id)}
              style={{ marginLeft: "10px" }}
            >
              Toggle
            </button>

            <button
              onClick={() => deleteHabit(habit.id)}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <h2>Progress Chart 📊</h2>

      <BarChart width={300} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}

export default App;