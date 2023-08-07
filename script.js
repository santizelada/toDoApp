const date = document.querySelector('#date')
const list = document.querySelector('#list')
const element = document.querySelector('#element')
const input = document.querySelector('#input')
const enter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id 
let LIST



//Date function creation
const DATE = new Date()
date.innerHTML= DATE.toLocaleDateString('en-US',{month:'short', weekday:'long', day:'numeric'})


//Function 'Add task'

function addTask (task, id, done, deleted) {

    if(deleted) {return}


    const DONE = done ?check :uncheck
    const LINE = done ? lineThrough : ''

        const element = `
                        <li id="element">
                        <i class="far ${DONE} co" data="done" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                        </li>
                        `
        list.insertAdjacentHTML("beforeend",element)
}






//function taskDone
function taskDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck) //*****************************buscar en ChatGPT qué es 'toggle'
    element.parentNode.querySelector('.text').classList.toggle(lineThrough) //ANALIZAR POR QUÉ EL PUNTO AL LADO DE '.text' determinaba si el lineThrough funcionaba o no
    LIST[element.id].done = LIST[element.id].done ?false :true
}



//function taskDeleted
function taskDeleted(element) {              //************** ojo acá que se habla de taskDeleted y no taskDone */
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].deleted = true
}




enter.addEventListener('click',()=> {
    const task = input.value
    if(task) {
        addTask(task,id,false,false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            deleted: false
        })
    
    }
    localStorage.setItem('ToDo',JSON.stringify(LIST))
    input.value=''
    id++
    console.log(LIST)
    
})

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const task = input.value
        if(task){
            addTask(task,id,false,false)
            LIST.push({
                name: task,
                id: id,
                done: false,
                deleted: false
            })
        }
        localStorage.setItem('ToDo',JSON.stringify(LIST))
        input.value=''
        id++
    }
})

list.addEventListener('click', function(event){
    const element = event.target 
    const elementData = element.attributes.data.value 

    if(elementData ==='done'){
        taskDone(element) //controlar que esta función haya sido creada. Not sure if it was. This is what the guy typed

    }
    else if (elementData ==='deleted'){ //cerciorar 'deleted' como atributo-parámetro efectivamente asignable
        taskDeleted(element)
    }
    localStorage.setItem('ToDo',JSON.stringify(LIST))

})


let data = localStorage.getItem('ToDo')
if (data){
        LIST=JSON.parse(data)
        id= LIST.length
        loadList(LIST)
}
else {
    LIST = []
    id=0
}

function loadList(DATA){
    DATA.forEach(function(i){
        addTask(i.name,i.id,i.done,i.deleted)
    })
}