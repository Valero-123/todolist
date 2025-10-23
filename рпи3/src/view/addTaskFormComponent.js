import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstractComponent.js';
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


export default class AddTaskFormComponent extends AbstractComponent{
    get template() {
        return createAddTaskFormComponentTemplate();
    }
}