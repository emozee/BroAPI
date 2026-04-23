const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const counter = document.getElementById('taskCounter');
const clearAllBtn = document.getElementById('clearAllBtn');
const clockDisplay = document.getElementById('clockDisplay');

// --- 1. THE CLOCK (Stretch Goal) ---
setInterval(() => {
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString();
}, 1000);

// --- 2. LOCAL STORAGE LOGIC ---

// Load data when page opens
let savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
renderTasks();

function saveToStorage() {
    const tasks = [];
    // Loop through the actual list on the screen and grab the text
    document.querySelectorAll('li').forEach(li => {
        // We only want the text, not the word "Delete" inside the button
        tasks.push(li.firstChild.textContent); 
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function renderTasks() {
    // Clear the current list and redraw from storage
    list.innerHTML = "";
    savedTasks.forEach(taskText => {
        createTaskElement(taskText);
    });
    updateCounter();
}

// --- 3. CREATING TASKS ---

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function() {
        li.remove();
        updateCounter();
        saveToStorage(); // Save after deleting
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// --- 4. BUTTON ACTIONS ---

addBtn.addEventListener('click', function() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    input.value = "";
    updateCounter();
    saveToStorage(); // Save after adding
});

// Clear All Button
clearAllBtn.onclick = function() {
    if (confirm("Are you sure you want to clear everything?")) {
        list.innerHTML = "";
        localStorage.removeItem('myTasks');
        updateCounter();
    }
};

function updateCounter() {
    const totalTasks = list.children.length;
    const taskWord = totalTasks === 1 ? "task" : "tasks";
    counter.textContent = `${totalTasks} ${taskWord} remaining`;
}