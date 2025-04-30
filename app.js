let taskList = [];

window.onload = () => {
  loadTasks();
};

// Add task
function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Please enter a task before adding.',
    });
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  taskList.push(task);
  saveTasks();
  renderTasks();

  Swal.fire({
    icon: 'success',
    title: 'Task Added!',
    text: `"${taskText}" has been added.`,
    timer: 1500,
    showConfirmButton: false
  });

  input.value = "";
}

// Render tasks
function renderTasks() {
  const listEl = document.getElementById("task-list");
  listEl.innerHTML = "";

  taskList.forEach(task => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.textContent = task.text;

    // Toggle done
    li.onclick = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    };

    // Right-side controls
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "10px";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editTask(task.id);
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    listEl.appendChild(li);
  });
}

// Edit task
function editTask(id) {
  const task = taskList.find(t => t.id === id);

  Swal.fire({
    title: 'Edit Task',
    input: 'text',
    inputValue: task.text,
    showCancelButton: true,
    confirmButtonText: 'Update',
    preConfirm: (newText) => {
      if (!newText) {
        Swal.showValidationMessage('Task cannot be empty!');
        return false;
      }
      return newText;
    }
  }).then(result => {
    if (result.isConfirmed) {
      task.text = result.value;
      saveTasks();
      renderTasks();

      Swal.fire({
        icon: 'success',
        title: 'Task Updated',
        text: `"${task.text}" updated successfully!`,
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

// Delete task
function deleteTask(id) {
  const task = taskList.find(t => t.id === id);
  Swal.fire({
    title: 'Are you sure?',
    text: `"${task.text}" will be removed!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      taskList = taskList.filter(t => t.id !== id);
      saveTasks();
      renderTasks();

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Task has been deleted.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    taskList = JSON.parse(data);
    renderTasks();
  }
}
