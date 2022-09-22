//Created By Hazzan

//updating the date 
//converting week number to week name
const getDayOfWeek = function(dayNumber){
    switch(dayNumber){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Satureday";
        default:
            return "Not a valid day"

    }
}


//converting month number to month name
const getMonth = function(monthNumber){
    switch(monthNumber){
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 6:
            return "Dec";
        default:
            return "Not a valid month"

    }
}

update();
setInterval(update, 1000)
function update(){
    let date = new Date();

    document.querySelector(".date").textContent = formatDate(date);

    function formatDate(date){

        let dayOfWeek = getDayOfWeek(date.getDay());
        let month = getMonth(date.getMonth());
        let dayOfMonth = date.getDate();
        let year = date.getFullYear(); 

        return `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
    }
}


//toggling the menu button
const menuBtn = document.querySelector(".menu-btn");
const dropdownContainer = document.querySelector(".dropdown-container");
menuBtn.addEventListener("click", () => {
    dropdownContainer.classList.toggle("active");
});


//Changing the background color

const color = document.querySelectorAll(".color");
color.forEach(color => color.addEventListener("click", ({target}) => {
 localStorage.setItem("color", target.dataset.color);
 changeBgColor(target.dataset.color)
}));

window.addEventListener("DOMContentLoaded", () => changeBgColor(localStorage.getItem('color')))

function changeBgColor(color) {
   if (color) document.querySelector("body").style.backgroundColor = color
}

//App info
const show = document.querySelector(".dropdown-link");
const appInfo = document.querySelector(".app-info");
const okBtn = document.querySelector(".model-btn");

show.addEventListener("click", () => {
    appInfo.classList.add("active");
});

okBtn.addEventListener("click", () => {
    appInfo.classList.remove("active");
});




//Creating the todo app
const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn")
const taskBox = document.querySelector(".task-box");

let editId;
let isEditedId = false 

//getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//checking for if task is complited
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter){
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let iscomplited = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all")
            li += ` <li class="task">
            <label for="${id}">
              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${iscomplited}>
              <p class="${iscomplited}">${todo.name}</p>
            </label>
            <div class="settings">
                <i  class="fa fa-ellipsis-h" id="i"></i>
                <ul class="task-menu">
                  <li onclick="editTask(${id}, '${todo.name}')"><i class="fa fa-pencil-square-o"></i>Edit</li>
                  <li onclick="deleteTask(${id})"><i class="fa fa-trash"></i>Delete</li>
                </ul>
              </div>
          </li>`;
        }); 
    }
    //if li isn't empty, insert value inside taskbox else insert span
    taskBox.innerHTML = li || `<span class="before">You don't have any task here</span>`; 
}
showTodo("all");

//edit task function
function editTask(taskId, taskName){
    editId = taskId
    isEditedId = true
    taskInput.value = taskName
}

//delete btn function 
function deleteTask(deleteId){
    //remove selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

//clear all function
clearAll.addEventListener("click", () => {
    //remove all task from array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

//status update function
function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");  
        todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");     
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}


taskInput.addEventListener("keyup", e => {
    //geting user text
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedId){ //if isedited isn't true do this
            if(!todos){ //if todos isn't existing pass empty array to todos
                todos = [];
            }
            let taskInfo = {name:userTask, status:"pending"}
            todos.push(taskInfo); // adding new task to todos
        }else{ //else if isedited is true do this
            isEditedId = false;
            todos[editId].name = userTask
        }

        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});

















//Created By Hazzan
