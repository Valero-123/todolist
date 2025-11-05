import TaskListComponent from "../view/taskListComponent.js";
import TaskComponent from "../view/taskComponent.js";
import TaskBoardComponent from "../view/taskBoardComponent.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearButtonComponent.js";
import PlugComponent from "../view/plugComponent.js";

export default class TaskBoardPresenter {
    handleClearButtonClick = () => {
        this.clearBucket();
    };

    #clearBtnComponent = new ClearButtonComponent({
        onClick: this.handleClearButtonClick
    });

    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this))
    }

    init() {
        this.#renderBoard()
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });

        render(taskComponent, container);
    }

    #renderTasksList(status, container) {
        const tasksListComponent = new TaskListComponent(
            status, 
            StatusLabel[status], 
            this.#handleTaskDrop.bind(this));

        render(tasksListComponent, container)

        return tasksListComponent
    }

    #renderClearButton(status, container, tasks) {
        if (status === Status.TRASH && tasks.length > 0) {
            render(this.#clearBtnComponent, container)
        }
    }

    #renderPlugComponent(tasks, container) {
        if (tasks.length === 0) {
            const plugTask = new PlugComponent();
            render(plugTask, container);
        }
    }


    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        Object.values(Status).forEach(element => {
            const tasksListComponent = this.#renderTasksList(element, this.#tasksBoardComponent.element);

            const filteredTasks = this.tasks.filter(task => task.status === element);

            this.#renderPlugComponent(filteredTasks, tasksListComponent.element)

            for (let j = 0; j < filteredTasks.length; j++) {
                this.#renderTask(filteredTasks[j], tasksListComponent.element)
            }

            this.#renderClearButton(element, tasksListComponent.element, filteredTasks)
        });
    }

    createTask() {
        const taskTitle = document.querySelector('.inputTask').value.trim();

        if (!taskTitle)
            return;

        this.#tasksModel.addTask(taskTitle);
        document.querySelector('.inputTask').value = '';
    }

    clearBucket() {
        this.#tasksModel.clearBucket();
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #handleTaskDrop(taskId, newStatus, afterTaskId) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus, afterTaskId);
    }
}