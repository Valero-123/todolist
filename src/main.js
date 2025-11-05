import HeaderComponent from './view/headerComponent.js';
import AddTaskFormComponent from './view/addTaskFormComponent.js';

import {render, RenderPosition} from './framework/render.js';
import TaskBoardPresenter from './presenter/taskBoardPresenter.js';
import TasksModel from './model/taskModel.js';

const headerContainer = document.querySelector('.header');

const addTaskContainer = document.querySelector('.addTaskForm')
const taskBoardContainer = document.querySelector('.container');

const tasksModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter({boardContainer: taskBoardContainer, tasksModel});

const formAddTaskComponent = new AddTaskFormComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), headerContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, addTaskContainer,RenderPosition.BEFOREBEGIN);

taskBoardPresenter.init();
