import TaskListComponent from "../view/taskListComponent.js";
import TaskComponent from "../view/taskComponent.js";
import TaskBoardComponent from "../view/taskBoardComponent.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearButtonComponent.js";
import PlugComponent from "../view/plugComponent.js";
import { UserAction } from "../mock/tasks.js";
import LoadingViewComponent from "../view/loadingViewComponent.js";

export default class TaskBoardPresenter {
    #clearBtnComponent = new ClearButtonComponent({
        onClick: this.#handleClearButtonClick.bind(this)
    });
    #loadingComponent = null;

    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this))
    }

    async init() {
        this.#showLoading();
        try {
            await this.#tasksModel.init();
            this.#clearBoard();

            this.#renderBoard()
        } catch (err) {
            console.error('Ошибка при инициализации доски: ', err)
        }


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

    async #handleClearButtonClick() {
        try {
            await this.#tasksModel.clearBucket();
        } catch (err) {
            console.error('Ошибка при очистке корзины: ', err)
        }
    };

    async createTask() {
        const taskTitle = document.querySelector('.inputTask').value.trim();

        if (!taskTitle)
            return;
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.inputTask').value = '';

        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
        }

    }

    #showLoading() {
        if (!this.#loadingComponent) {
            this.#loadingComponent = new LoadingViewComponent();
            render(this.#loadingComponent, this.#boardContainer);
        }

        if (this.#tasksBoardComponent?.element) {
            this.#tasksBoardComponent.element.classList.add('hidden');
        }
    }

    #hideLoading() {
        if (this.#loadingComponent) {
            this.#loadingComponent.element.remove();
            this.#loadingComponent = null;
        }

        if (this.#tasksBoardComponent?.element) {
            this.#tasksBoardComponent.element.classList.remove('hidden');
        }
    }

    #handleModelChange(event) {
        switch (event) {
            case UserAction.LOADING_START:
                this.#showLoading();
                break;

            case UserAction.LOADING_END:
                this.#hideLoading();
                break;

            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
        this.#hideLoading();
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    async #handleTaskDrop(taskId, newStatus) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи: ', err);
        }
    }
}