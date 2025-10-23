import HeaderComponent from './view/headerComponent.js';
import AddTaskFormComponent from './view/addTaskFormComponent.js';

import {render, RenderPosition} from './framework/render.js';
import TaskBoardPresenter from './presenter/taskBoardPresenter.js';
import TasksModel from './model/taskModel.js';

const headerContainer = document.querySelector('.header');
const addTaskFormContainer= document.querySelector('.addTaskForm');
const taskBoardContainer = document.querySelector('.container');

const tasksModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter({boardContainer: taskBoardContainer, tasksModel});

render(new HeaderComponent(), headerContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), addTaskFormContainer, RenderPosition.BEFOREBEGIN);


taskBoardPresenter.init();