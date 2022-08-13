import Component from "../common/component";
import { ViewOption } from "./viewoption";
import { DataModel } from "../model";
import { SortState } from "../interfaces/sortstate";

export class SortView extends Component {
  select: Component;
  optionByName: ViewOption;
  optionReverseByName: ViewOption;
  optionByYear: ViewOption;
  optionReverseByYear: ViewOption;
  optionByPrice: ViewOption;
  optionReverseByPrice: ViewOption;
  title: Component;
  options: ViewOption[];
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, model: DataModel) {
    super(parentNode, tagName, className, content);
    this.title = new Component(this.node, 'h2', 'subtitle', 'Сортировка');
    this.select = new Component(this.node, 'select', 'select', '');
    const callback = (key: keyof SortState, data: boolean) => {
      model.setSortState(key, data)
    }
    this.optionByName = new ViewOption(this.select.node, 'option', 'option', 'По названию, от A до Z', 'name', false, callback);
    this.optionReverseByName = new ViewOption(this.select.node, 'option', 'option', 'По названию, от Z до A', 'reverseName', false, callback);
    this.optionByYear = new ViewOption(this.select.node, 'option', 'option', 'По году публикации, по возрастанию', 'year', false, callback);
    this.optionReverseByYear = new ViewOption(this.select.node, 'option', 'option', 'По году публикации, по убыванию', 'reverseYear', false, callback);
    this.optionByPrice = new ViewOption(this.select.node, 'option', 'option', 'По цене, по возрастанию', 'price', false, callback);
    this.optionReverseByPrice = new ViewOption(this.select.node, 'option', 'option', 'По цене, по убыванию', 'reversePrice', false, callback);
    this.options = [this.optionByName, this.optionReverseByName, this.optionByYear, this.optionReverseByYear, this.optionByPrice, this.optionReverseByPrice]
    this.select.node.onchange = () => {
      this.options.forEach((option) => {
        if ((option.node as HTMLOptionElement).selected) {
          model.setSortState(option.key, true);
        }
      })
    }
  }
}