import {createElement} from '../framework/render.js'; 


function createAddTaskComponentTemplate() {
    return (
        `<div class = "addtask">
            <h2 class="newtaskHeader">Новая задача</h2>
            <div class="addnewtask">
                <input class="inputtask" type="text" placeholder="Название задачи">
                <button class="addtaskbut">+ Добавить</button>
            </div>
         </div>`
        );
}


export default class AddTaskComponent {
  getTemplate() {
    return createAddTaskComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
