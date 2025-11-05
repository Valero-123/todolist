import { AbstractComponent } from '../framework/view/abstractComponent.js';

function createTaskListComponentTemplate(className, label) {
    return (
        `<section class="${className} taskList">
      <h3 class="taskHeader">${label}</h3>
    </section>`
    );
}

export default class TaskListComponent extends AbstractComponent {
    constructor(status, label, onTaskDrop) {
        super();
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

            const afterElement = this.#getDragAfterElement(container, event.clientY);
            const afterTaskId = afterElement?.dataset.taskId ?? null;

            onTaskDrop(taskId, this.status, afterTaskId);
        });
    }

    #getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}