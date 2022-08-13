import Component from "../common/component";
import { FilterState } from "../interfaces/filterstate";
import { CallbackType } from "../types/types";

export class ViewButton extends Component {
  key: keyof FilterState;
  data: string | number;
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, key: keyof FilterState, data: string | number, callback: CallbackType) {
    super(parentNode, tagName, className, content);
    this.key = key;
    this.data = data;
    this.node.onclick = () => {
      callback(this.key, this.data);
    }
  }

  setClass(data: boolean) {
    if (data) {
      this.node.classList.add('button_active')
    } else {
      this.node.classList.remove('button_active')
    }
  }
}