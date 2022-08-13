import Component from "../common/component";
import { Input } from "../common/input";
import { DataModel } from "../model";

export class Search extends Component {
  title: Component;
  searchInput: Input;
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, model: DataModel) {
    super(parentNode, tagName, className, content);
    this.title = new Component(this.node, 'h2', 'subtitle', 'Поиск');
    this.searchInput = new Input(this.node, 'input', 'search', '', 'search', 'search book', (data: string): void => model.search(data));
    this.searchInput.node.focus();
  }
}