// lets select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// CHECK, UNCHECK, LINE_THROUGH
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Vareialbes for items
let LIST;
let id;

let data = localStorage.getItem("TODO");

// check if data is not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); 
} else {
    LIST = [];
    id = 0;
}

// load items 
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// for todays date
const today = new Date();
const myOptions =  {weekday: "long", month: "short", day: "numeric" };
dateElement.innerHTML = today.toLocaleDateString("en-US", myOptions);

//add to do
function addToDo(toDo, id, done, trash) {
    // if item is deleted function will stop execution
    if(trash) {
        return;
    }
    // check do To if its completed 
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = `
            <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>`;
    const position = "beforeend"
    list.insertAdjacentHTML(position, item);
}
// add an item (enter key)
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        // check if input value is empty
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            // increment id for next item
            id++;
        }
        // clear our "add to do" input
        input.value = "";
    }
});

// function completeToDo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    // update an array
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove toDo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// event listener for items
list.addEventListener("click", function(event) {
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    // add item to localstorage 
    localStorage.setItem("TODO", JSON.stringify(LIST));
})
