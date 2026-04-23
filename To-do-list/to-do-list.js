// 1. Link our code to the HTML elements
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const counter = document.getElementById('taskCounter');

// 2. Helper function to update the counter text
function updateCounter() {
    const totalTasks = list.children.length;
    // This makes it grammatically correct: "1 task" vs "2 tasks"
    const taskWord = totalTasks === 1 ? "task" : "tasks";
    counter.textContent = `${totalTasks} ${taskWord} remaining`;
}

// 3. What happens when you click 'Add'
addBtn.addEventListener('click', function() {
    const taskText = input.value.trim();

    // FEATURE: Don't add empty tasks
    if (taskText === "") {
        alert("You can't add an empty task!");
        return; // This exits the function early
    }

    // Create the 'li' and set the text
    const li = document.createElement('li');
    li.textContent = taskText;

    // FEATURE: Add a Delete button to every new task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    // Set up the delete button's "brain"
    deleteBtn.onclick = function() {
        li.remove();
        updateCounter(); // FEATURE: Sync counter when deleted
    };

    // Assemble the task and add it to the list
    li.appendChild(deleteBtn);
    list.appendChild(li);

    // FEATURE: Clear the input so you can type a new task immediately
    input.value = "";
    
    // FEATURE: Sync counter when added
    updateCounter();
});