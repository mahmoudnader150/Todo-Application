let tasks = [];

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
});

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const descriptionInput = document.getElementById("descriptionInput");
  const startDateInput = document.getElementById("startDateInput");
  const endDateInput = document.getElementById("endDateInput");
  const priorityInput = document.getElementById("priorityInput");

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (endDate < startDate) {
    window.alert("End date should be greater than or equal to the start date.");
    return;
  }

  const taskName = taskInput.value.trim();
  if (taskName === "") {
    window.alert("Task name cannot be empty.");
    return;
  }

  const task = {
    name: taskName,
    description: descriptionInput.value.trim(),
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    priority: priorityInput.value,
    done: false,
  };

  tasks.push(task);
  taskInput.value = "";
  descriptionInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  renderTasks();

  // Store tasks in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
document
  .getElementById("taskInput")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      // Check if Enter key is pressed
      event.preventDefault();
      addTask();
    }
  });
// Function to render tasks
// Function to render tasks
// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.innerText = "No tasks have been added.";
    noTasksMessage.style.textAlign = "center";
    noTasksMessage.style.fontWeight = "bold";
    noTasksMessage.style.marginTop = "20px";
    taskList.appendChild(noTasksMessage);
    return;
  }

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "todo-item";
    taskItem.style.border = task.done ? "3px solid green" : "2px solid #000"; // Update border style
    taskItem.style.backgroundColor = "#f4f4f4"; // Update background color

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      toggleTaskStatus(index);
    });

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const taskName = document.createElement("a");
    taskName.className = "task-name";
    taskName.innerText = task.name;
    if (task.done) {
      taskName.classList.add("done");
    }

    const taskDescription = document.createElement("div");
    taskDescription.className = "task-description";
    taskDescription.innerText = task.description;

    const taskDates = document.createElement("div");
    taskDates.className = "task-dates";
    taskDates.innerHTML = `<b>Start Date:</b> ${task.startDate}<br><b>End Date:</b> ${task.endDate}`;

    const taskPriority = document.createElement("div");
    taskPriority.className = `task-priority ${task.priority}`;
    taskPriority.innerText = `Priority: ${
      task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
    }`;

    taskInfo.appendChild(taskName);
    taskInfo.appendChild(taskDescription);
    taskInfo.appendChild(taskDates);
    taskInfo.appendChild(taskPriority);

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit-btn";
    editButton.style.backgroundColor = "green";
    editButton.addEventListener("click", () => {
      editTask(index);
    });

    taskActions.appendChild(deleteButton);
    taskActions.appendChild(editButton);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskInfo);
    taskItem.appendChild(taskActions);

    taskList.appendChild(taskItem);
  });
}

// Function to toggle task status
function toggleTaskStatus(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to edit a task name
function editTask(index) {
  const task = tasks[index];
  let updatedTaskName = prompt("Enter the updated task name:", task.name);
  updatedTaskName = updatedTaskName.trim();

  // Check if the updated task name is not empty
  if (updatedTaskName !== "") {
    tasks[index].name = updatedTaskName;
    renderTasks();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove all tasks
function removeAllTasks() {
  tasks = [];
  renderTasks();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to sort tasks based on the selected option
function sortTasks() {
  const sortSelect = document.getElementById("sortSelect");
  const selectedOption = sortSelect.value;

  switch (selectedOption) {
    case "name":
      tasks.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "startDate":
      tasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      break;
    case "endDate":
      tasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      break;
    case "priority":
      tasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      break;
    default:
      // No sorting needed, do nothing
      break;
  }

  renderTasks();
}
