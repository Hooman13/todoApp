"use strict";
let taskIDCounter = 0;
let taskList = [];
const TASK_STATUS = Object.freeze({
    todo: "todo",
    done: "done",
});
function changeTaskList(newTaskList) {
    if (!newTaskList) {
        return;
    }
    taskList = newTaskList;
    renderTasks();
}
function taskFactory(text = "", status = TASK_STATUS.todo) {
    // if (typeof text !== "string") {
    //   return;
    // }
    // if (status !== TASK_STATUS.todo && status !== TASK_STATUS.done) {
    //   return;
    // }
    const taskObject = {
        id: `tasks-uuid-${taskIDCounter}`,
        text,
        status, // status: status
    };
    taskIDCounter++;
    return taskObject;
}
function renderTask(taskObject) {
    // if (
    //   !taskObject ||
    //   typeof taskObject !== "object" ||
    //   taskObject === undefined
    // ) {
    //   return;
    // }
    let todoListStateClass = "";
    if (taskObject.status === TASK_STATUS.todo) {
        todoListStateClass = "bg-gray-100";
    }
    else if (taskObject.status === TASK_STATUS.done) {
        todoListStateClass = "bg-green-100";
    }
    return `<li class="rounded-xl p-2 mt-1 flex justify-between ${todoListStateClass}">
  <p class=${taskObject.status === TASK_STATUS.done ? "line-through" : ""}>${taskObject.text}</p>
  <input value="${taskObject.text}" style="display:none" /> 
  <div>
    <span class="fa fa-minus-circle text-red-500 cursor-pointer" data-action="delete" data-target="${taskObject.id}"></span>
    <span class="fa fa-check-circle text-green-500 cursor-pointer" data-action="update" data-target="${taskObject.id}"></span>
  </div>
</li>`;
}
function renderTasks() {
    const todoListElement = document.querySelector("#todo-list");
    if (todoListElement === null) {
        return;
    }
    let renderedTasks = [];
    for (let i = 0; i < taskList.length; i += 1) {
        // if (
        //   !taskList[i] ||
        //   typeof taskList[i] !== "object" ||
        //   taskList[i] === undefined
        // ) {
        //   return;
        // }
        const tsListIndex = taskList[i];
        if (tsListIndex === undefined)
            throw new Error("");
        renderedTasks.push(renderTask(tsListIndex));
    }
    todoListElement.innerHTML = renderedTasks.join("\n");
}
function createTask(text = "") {
    const task = taskFactory(text);
    changeTaskList([...taskList, task]);
}
function deleteTask(taskId) {
    // if (typeof taskId !== "string" || !taskId) {
    //   return;
    // }
    let newTaskList = [];
    for (let i = 0; i < taskList.length; i += 1) {
        const taskListIndex = taskList[i];
        if (taskListIndex === undefined)
            throw new Error("");
        if (taskListIndex.id !== taskId) {
            newTaskList.push(taskListIndex);
        }
    }
    changeTaskList(newTaskList);
}
const createTaskForm = document.querySelector("#create-todo");
const createTaskInput = createTaskForm.querySelector("input");
const createTaskButton = createTaskForm.querySelector("button");
function createTaskHandler() {
    const value = createTaskInput.value;
    if (!value) {
        return;
    }
    createTask(value);
    createTaskInput.value = "";
}
function updateTask(taskID, payload) {
    // if (typeof taskID !== "string" || !taskID) {
    //   return;
    // }
    const newTaskList = taskList.map(function (task) {
        if (task.id === taskID) {
            let { text, status } = payload;
            if (typeof text !== "string") {
                text = task.text;
            }
            if (typeof status !== "string" ||
                (status !== TASK_STATUS.todo && status !== TASK_STATUS.done)) {
                status = task.status;
            }
            return Object.assign({}, task, { text, status });
        }
        else {
            return task;
        }
    });
    changeTaskList(newTaskList);
}
createTaskButton.addEventListener("click", createTaskHandler);
const todoListElement = document.querySelector("#todo-list");
todoListElement.addEventListener("click", function (event) {
    if (event.target === null) {
        return;
    }
    else {
        const targetEl = event.target;
        console.log("target------", targetEl);
        if (targetEl.dataset.action === "delete") {
            const taskId = targetEl.dataset.target;
            deleteTask(taskId);
        }
    }
    // if (targetEl.dataset.action === "update") {
    //   const taskId = targetEl.dataset.target;
    //   updateTask(taskId, { status: TASK_STATUS.done });
    // }
});
