// script.js

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");
  const todoError = document.getElementById("todoError");

  const filterButtons = document.querySelectorAll(".filter-btn");
  let filter = "all";

  const noteInput = document.getElementById("noteInput");
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteContainer = document.getElementById("noteContainer");
  const noteError = document.getElementById("noteError");

  const themeToggle = document.getElementById("themeToggle");
  const currentTime = document.getElementById("currentTime");
  const greeting = document.getElementById("greeting");

  // Show current time
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}:${seconds}`;

    if (now.getHours() < 12) {
      greeting.textContent = "Good morning";
    } else if (now.getHours() < 18) {
      greeting.textContent = "Good afternoon";
    } else {
      greeting.textContent = "Good evening";
    }
  }
  setInterval(updateTime, 1000);
  updateTime();

  addTodoBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task === "") {
      todoError.textContent = "Task cannot be empty.";
      return;
    }
    todoError.textContent = "";

    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox">
      <span class="text">${task}</span>
      <button class="deleteBtn">Delete</button>
    `;
    todoList.appendChild(li);
    todoInput.value = "";
    updateFilter();
  });

  todoList.addEventListener("click", (e) => {
    const target = e.target;
    const li = target.closest("li");
    if (target.type === "checkbox") {
      li.classList.toggle("completed", target.checked);
    } else if (target.classList.contains("deleteBtn")) {
      li.remove();
    }
    updateFilter();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filter = btn.dataset.filter;
      updateFilter();
    });
  });

  function updateFilter() {
    const items = todoList.querySelectorAll("li");
    items.forEach(item => {
      item.style.display = "block";
      if (filter === "completed" && !item.classList.contains("completed")) {
        item.style.display = "none";
      }
      if (filter === "incomplete" && item.classList.contains("completed")) {
        item.style.display = "none";
      }
    });
  }

  addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText === "") {
      noteError.textContent = "Note cannot be empty.";
      return;
    }
    noteError.textContent = "";

    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = `
      <button class="deleteNote">×</button>
      <p>${noteText}</p>
    `;
    noteContainer.appendChild(note);
    noteInput.value = "";
  });

  noteContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteNote")) {
      e.target.parentElement.remove();
    }
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent =
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
});
