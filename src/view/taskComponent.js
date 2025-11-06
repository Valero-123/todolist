import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createTaskComponentTemplate(task) {
    const {title} = task;
    return (
        `   <section class="tasksList">
                    <div class="task">
                        ${title}
                    </div>
                </section>`
    );
}

export default class TaskComponent extends AbstractComponent{
    constructor({task}) {
        super()
        this.task = task;
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute(`draggable`, true);

        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.task.id);
        });
    }
}