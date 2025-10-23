import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createAddTaskFormComponentTemplate() {
    return (
        `   <div class="newTask">
            <h2 class="newTaskHeader">
                Новая задача
            </h2>
            <div class="addNewTask">
                <input class="inputTask" type="text" placeholder="Название задачи">
                <button class="addTask" type="submit">+ Добавить</button>
            </div>
        </div>`
    );
}


export default class AddTaskFormComponent extends AbstractComponent{
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('click', this.#clickHandler);
    }
    
    get template() {
        return createAddTaskFormComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}