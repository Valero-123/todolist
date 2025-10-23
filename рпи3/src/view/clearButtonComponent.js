import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstractComponent.js';
function createClearButtonComponentTemplate() {
    return (
        `<div class='btn'>   
        <button class="clearBtn">
                    × Очистить
                </button> 
                </div>`
    );
}

export default class ClearButtonComponent extends AbstractComponent{
    get template() {
        return createClearButtonComponentTemplate();
    }
}