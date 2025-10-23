import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstractComponent.js';
function createTaskBoardComponentTemplate() {
    return (
        `
            <section class="tasks">
            </section>
        `
    );
}

export default class TaskBoardComponent extends AbstractComponent{
    get template() {
        return createTaskBoardComponentTemplate();
    }
}