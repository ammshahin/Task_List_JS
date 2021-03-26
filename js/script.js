//Define Ui elements
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let taskFilter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//dedine eventlisteners

form.addEventListener('submit', addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click', clearAll);
taskFilter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

//Define Funvctions

//Add task

function addTask(e) {
    //console.log(taskInput.value);
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeInLocal(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}; 

//Remove task

function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are you sure?')){
            let el = e.target.parentElement;
            el.remove();
           // console.log(el);
           removeFromLs(el);
        }
        
    }

    
}

//VClear all

function clearAll(e){
    taskList.innerHTML = '';
    localStorage.clear();
}

//filter task

function filterTask(e){
    let text = e.target.value.toLowerCase();
    //console.log(text);;
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
};

//Store in lovcal

function storeInLocal(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    });
};

function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}