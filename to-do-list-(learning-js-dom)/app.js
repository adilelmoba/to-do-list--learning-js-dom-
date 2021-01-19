const list = document.querySelector('#todo-list ul');
const forms = document.forms;

///////////////////////
/// FUNCTIONS
function isEmpty(str) {
    return (!str || 0 === str.length);
}


///////////////////////
/// DELETE TASKS
list.addEventListener('click', (e) => {
    if(e.target.id == 'delete') {
        const li = e.target.parentElement.parentElement;
        li.parentNode.removeChild(li);
    }
});

///////////////////////
/// ADD TASKS
const addForm = forms['add-task'];
addForm.addEventListener('submit', function(e){
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

    if(!isEmpty(value)) {
        // Create elements
        const li = document.createElement('li');
        const taskName = document.createElement('span');
        const deleteBtn = document.createElement('span');

        // Add text content
        taskName.textContent = value;
        deleteBtn.innerHTML = '<i id="delete" class="fas fa-trash-alt"></i>';

        // Add classes
        taskName.classList.add('name');
        deleteBtn.classList.add('delete');

        // Append to DOM
        li.appendChild(taskName);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        // Clear input
        document.getElementById('input-add').value = '';
    } else {
        alert('Please! Enter the Task ✔');
    }

});

///////////////////////
/// FILTER TASKS
const searchBar = forms['search-tasks'].querySelector('input');
searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const tasks = list.getElementsByTagName('li');
    Array.from(tasks).forEach((task) => {
        const title = task.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(term) != -1) {
            task.style.display = 'flex';
            
        } else {
            task.style.display = 'none';
        }
    });
});

