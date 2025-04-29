function addTask() {
    const input = document.getElementById("task-input");
    const taskText = input.value.trim();

    if (taskText === "") return;
   
  
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;
  
    const actions = document.createElement("div");
    actions.className = "actions";
  
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(li, span);
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => li.remove();
  
    actions.append(editBtn, deleteBtn);
    li.append(span, actions);
  
    document.getElementById("task-list").appendChild(li);
    input.value = "";
  }
  
  function editTask(li, span) {
    const currentText = span.textContent;
    const input = document.createElement("input");
    input.className = "edit";
    input.value = currentText;
  
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "💾";
    saveBtn.onclick = () => {
      span.textContent = input.value;
      li.replaceChild(span, input);
      li.querySelector(".actions").replaceChild(editBtn, saveBtn);
    };
  
    const editBtn = li.querySelector(".actions button");
    li.replaceChild(input, span);
    li.querySelector(".actions").replaceChild(saveBtn, editBtn);
  }
  