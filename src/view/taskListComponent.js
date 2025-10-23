import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstractComponent.js';
function createTaskListComponentTemplate(className, label) {
    
    return (
        
        `   <section class="${className} taskList">
                <h3 class="taskHeader">${label}</h3>
            </section>`
    );
}

export default class TaskListComponent extends AbstractComponent{
    constructor(className, label) {
        super()
        this.className = className;
        this.label = label;
    }

    get template() {
        return createTaskListComponentTemplate(this.className, this.label);
    }
}