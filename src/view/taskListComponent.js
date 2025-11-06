import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createTaskListComponentTemplate(className, label) {
    
    return (
        
        `   <section class="${className} taskList">
                <h3 class="taskHeader">${label}</h3>
            </section>`
    );
}

export default class TaskListComponent extends AbstractComponent{
    constructor(status, label, onTaskDrop) {
        super()
        this.status = status;
        this.label = label;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createTaskListComponentTemplate(this.status, this.label);
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            onTaskDrop(taskId, this.status);
        });
    }
}