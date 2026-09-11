let tasks = [];

const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const searchInput = document.getElementById("searchInput");
const filterInput = document.getElementById("filterInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function addTask() {
    const text = taskInput.value.trim();
    const category = categoryInput.value;

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        category: category,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filter = filterInput.value;

    const filteredTasks = tasks.filter(function(task) {
        const matchesSearch = task.text
            .toLowerCase()
            .includes(searchText);

        const matchesFilter =
            filter === "All" ||
            (filter === "Completed" && task.completed) ||
            (filter === "Pending" && !task.completed);

        return matchesSearch && matchesFilter;
    });

    filteredTasks.forEach(function(task) {
        const card = document.createElement("div");
        card.className = "task-card";

        if (task.completed) {
            card.classList.add("completed");
        }

        const title = document.createElement("h3");
        title.textContent = task.text;

        const category = document.createElement("p");
        category.textContent = "Category: " + task.category;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.className = "complete-btn";

        completeBtn.addEventListener("click", function() {
            toggleTask(task.id);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function() {
            editTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });

        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(completeBtn);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);

        taskList.appendChild(card);
    });

    taskCounter.textContent = "Total Tasks: " + tasks.length;
}

function toggleTask(id) {
    const task = tasks.find(function(item) {
        return item.id === id;
    });

    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

function editTask(id) {
    const task = tasks.find(function(item) {
        return item.id === id;
    });

    if (!task) {
        return;
    }

    const newText = prompt("Enter updated task:", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        displayTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}

addTaskBtn.addEventListener("click", addTask);

searchInput.addEventListener("input", displayTasks);

filterInput.addEventListener("change", displayTasks);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();