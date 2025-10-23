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
    }

    get template() {
        return createTaskComponentTemplate(this.task);
    }
}