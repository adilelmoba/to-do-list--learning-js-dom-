const todo = document.querySelector('.ulTasks');
const list = document.querySelector('#todo-list ul');

const switchedText = document.querySelector('.switchedText');
const checkLi = function(){
/// NO LI EXISTS
    if (todo.hasChildNodes()) {
        switchedText.classList.add('hidden');
    } else {
        switchedText.classList.remove('hidden');
    }
};
checkLi();

const forms = document.forms;

///////////////////////
/// FUNCTIONS
function isEmpty(str) {
    return (!str || 0 === str.length);
}


///////////////////////
/// DELETE TASKS
list.addEventListener('click', (e) => {
    const li = e.target.parentElement.parentElement;
    const li_content = e.target.parentElement.parentElement.firstElementChild;
    if(e.target.id == 'delete') {
        
        li_content.classList.add('change');
        
        confetti.start();
        setTimeout(function(){
            li.parentNode.removeChild(li);
            confetti.stop();
        }, 3000);
        if (list.childElementCount === 1)
        switchedText.classList.remove('hidden');
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
        deleteBtn.innerHTML = '<i id="delete" class="fas fa-check-square"></i>';

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

    checkLi();

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

/////////////////////////////////////////////
////// CLEAR, SAVE BUTTONS and LOCAL STORAGE

const visitor = document.querySelector('.banner-paragraph');
const reminder = document.querySelector('.reminder');


// GET DATA FROM LOCAL STORAGE
const visitorData = localStorage.getItem('visitor');
const get = function getLocalStorage() {
    const data = localStorage.getItem('todo');
    if(!data || !visitorData) return;

    todo.innerHTML = '';
    
    todo.insertAdjacentHTML('afterbegin', data);

    visitor.textContent = `Welcome ${visitorData}, Have fun with your tasks!`;

    reminder.classList.remove('hidden');
}
get();
                    
// SAVE BUTTON
let champion;

// NOTIFICATIONS ON
showNotification = function() {
    const tasksNumber = localStorage.getItem('tasks-number');
    const visitorData = localStorage.getItem('visitor');
        const notification = new Notification(`Hi ${visitorData}, There is a List to Do`, {
            body: `${tasksNumber} tasks remaining! 💪`,
            icon: 'https://todolist-byadil.netlify.app/check.png'
            // icon: 'http://127.0.0.1:5500/check.png'
        });

        return notification;
}

// NOTIFICATIONS OFF
const stopNotification = function() {
    clearInterval(timer);
}

// SELECT HOUR
const hour = document.querySelector('.select');
let time;

let timer;
const saveBtn = document.getElementById('save-all');
const set = function setLocalStorage() {
    if (visitor.textContent === 'Daily TO DO List 📜') {
        champion = prompt('Hello, can you say your name? 😎'); 
        champion !== null ? champion = champion : champion = 'Guest';
        localStorage.setItem('visitor', champion);
        visitor.textContent = `Welcome ${champion}, Have fun with your tasks!`;

        stopNotification();
        if (Notification.permission === 'granted' && champion !== 'Guest') {
            // timer = setInterval(showNotification, 5000); // TO TEST     
            // timer = setInterval(showNotification, 60 * 180 * 1000); // FOR 3 HOURS  
            reminder.classList.remove('hidden');
            timer = setInterval(showNotification, 60 * +hour.value * 1000); 

        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if(permission === 'granted' && champion !== 'Guest') {
                    // timer = setInterval(showNotification, 5000); // TO TEST
                    // timer = setInterval(showNotification, 60 * 180 * 1000); // FOR 3 HOURS  

                    reminder.classList.remove('hidden');
                    timer = setInterval(showNotification, 60 * +hour.value * 1000);     
                }
            })
        }
    }
    localStorage.setItem('todo', todo.innerHTML);
    localStorage.setItem('tasks-number', todo.children.length);
  

}
saveBtn.addEventListener('click', set);

// CLEAR BUTTON
const clearBtn = document.getElementById('clear-all');
clearBtn.addEventListener('click', function(){
    todo.innerHTML = "";
    localStorage.removeItem('todo');
    localStorage.removeItem('visitor');
    localStorage.removeItem('tasks-number');
    visitor.textContent = 'Daily TO DO List 📜';

    reminder.classList.add('hidden');
    stopNotification();
    checkLi();
});

/*
/// TO ADD DATE!
const date = document.querySelectorAll('.date');
const taskContent = document.querySelector('.li');

date.forEach(d => d.addEventListener('keyup', function(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            d.style.display = 'none';
            // taskContent.forEach()
            taskContent.insertAdjacentHTML('afterend', `<span class="name" style="font-style: italic; opacity: 0.5;"> ${date.value} ⌚ </span>`);
        }
}));
*/


