import Component from "../common/component";
import { SortState } from "../interfaces/sortstate";

export class ViewOption extends Component {
  key: keyof SortState;
  data: boolean;
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, key: keyof SortState, data: boolean, callback: (key: keyof SortState, data: boolean) => void) {
    super(parentNode, tagName, className, content);
    this.key = key;
    this.data = data;
    this.node.onchange = () => {
      this.data = !this.data
      callback(this.key, this.data);
    }
  }

  setSelect(data: boolean) {
    (this.node as HTMLOptionElement).selected = data;
  }
}