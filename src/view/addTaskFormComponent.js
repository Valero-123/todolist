import { createElement } from '../framework/render.js';

function createAddTaskFormComponentTemplate() {
    return (
        `   <div class="newTask">
            <h2 class="newTaskHeader">
                Новая задача
            </h2>
            <div class="addNewTask">
                <input class="inputTask" type="text" placeholder="Название задачи">
                <button class="addTask">+ Добавить</button>
            </div>
        </div>`
    );
}


export default class AddTaskFormComponent {
    getTemplate() {
        return createAddTaskFormComponentTemplate();
    }


    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }


        return this.element;
    }


    removeElement() {
        this.element = null;
    }
}
