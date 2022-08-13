import Component from "../common/component";
import { FilterState } from "../interfaces/filterstate";
import { CallbackType } from "../types/types";

export class Checkbox extends Component {
  key: keyof FilterState;
  data: boolean;
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, key: keyof FilterState, data: boolean, callback: CallbackType) {
    super(parentNode, tagName, className, content);
    this.key = key;
    this.data = data;
    this.node.onclick = () => {
      this.data = !this.data;
      callback(this.key, this.data);
    }
  }

  setClass(data: boolean) {
    (this.node as HTMLInputElement).checked = data;
  }
}