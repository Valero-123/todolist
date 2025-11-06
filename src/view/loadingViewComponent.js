import { AbstractComponent } from "../framework/view/abstractComponent.js";

function createNoTaskTemplate() {
    return (
        `<p class=boardNoTasks>
            Loading...Please wait
        </p>`
    )
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createNoTaskTemplate();
    }
}