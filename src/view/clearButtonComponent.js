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
    #handleClick = null;

    constructor({onClick}) {
        super()
        this.#handleClick = onClick;
        this.element.querySelector('.clearBtn').addEventListener('click', this.#clickHandler);
    }
    

    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}