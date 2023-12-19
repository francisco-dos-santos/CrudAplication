const addbutton=document.querySelector("#wrapper button");
const inputTask=document.getElementById('inputtask');
const taskContainer=document.getElementById('tasks');
const countValue=document.querySelector('.count-value');
const error=document.querySelector('.error');
let taskCount=0;
console.log(error);

const displayCount=(taskCount)=>{
    countValue.textContent=taskCount;
}

const checkboxTask=(checkboxs)=>{
    checkboxs.forEach(checkbox => {
        checkbox.onchange=()=>{
            checkbox.nextElementSibling.classList.toggle('completed');
            if(checkbox.checked){
                taskCount-=1;
            }
            else{
                taskCount+=1;
            }
            displayCount(taskCount);
        }
    });
}

const deteleTask=(buttons)=>{
    buttons.forEach(button => {
        button.onclick=()=>{
            button.parentNode.remove();
            taskCount-=1;
            displayCount(taskCount);
        }
    });
}

const editTask=(buttons)=>{
    buttons.forEach(button => {
        button.onclick=(e)=>{
           let targetElement=e.target;
           if(!(e.target.className=="edit")){
                targetElement=e.target.parentElement;
           }
           inputTask.value=targetElement.previousElementSibling?.textContent;
           targetElement.parentNode.remove();
           taskCount-=1;
           displayCount(taskCount);
        }
    });
}
const addTask=()=>{
    const taskName=inputTask.value.trim();
    error.style.display="none";
    if(!taskName){
        setTimeout(()=>{
            error.style.display="block";
        },200);
        return;
    }

    const task=`<div class="task">
        <input type="checkbox" class="task-check">
        <p class="taskname">${taskName}</p>
        <button class="edit">
            <img src="assets/icons8_edit_file.ico" alt="icon edit" width=20px>
        </button>
        <button class="delete">
            <img src="assets/icons8_trash_can.ico" alt="icon delete" width=20px>
        </button>
    </div>`;

    taskContainer.insertAdjacentHTML('beforeend', task);

    const delButtons=document.querySelectorAll('.delete');
    const editButtons=document.querySelectorAll('.edit');
    const inputCheckboxs=document.querySelectorAll('.task-check');
    deteleTask(delButtons);
    editTask(editButtons);
    checkboxTask(inputCheckboxs);
    taskCount+=1;
    displayCount(taskCount);
    inputTask.value="";
};

addbutton.addEventListener('click',addTask);
inputTask.addEventListener("keydown", function(e){
    if(e.key==="Enter"){
        addbutton.click();
        return;
    }
});
window.onload=()=>{
    taskCount=0;
    displayCount(taskCount);
    inputTask.value="";
}