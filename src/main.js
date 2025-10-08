import AddTaskComponent from './view/AddTask-component.js';
import HeaderComponent from './view/header-component.js';
import TaskComponent from './view/Task-component.js';
import TaskBoardComponent from './view/TaskBoard-component.js';
import TaskListComponent from './view/TaskList-component.js';

import {render, RenderPosition} from './framework/render.js';



const taskBoardContainer = document.querySelector('.container');
const headerContainer = document.querySelector('.header');
const AddTaskContainer= document.querySelector('.addtask');
const taskBoardComponent = new TaskBoardComponent();



render(new HeaderComponent(), headerContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), AddTaskContainer, RenderPosition.BEFOREBEGIN);

render(taskBoardComponent, taskBoardContainer);


for (let j=0; j<4;j++) {
    const taskListComponent = new TaskListComponent();

    render(taskListComponent, taskBoardComponent.getElement());

    for (let i=0;i<4;i++) {
        render(new TaskComponent(), taskListComponent.getElement());
    }

}
