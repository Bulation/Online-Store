import Component from '../common/component';
import { DataModel } from '../model';

export class Reset extends Component {
  resetFilters: Component;
  resetSettings: Component;
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, model: DataModel) {
    super(parentNode, tagName, className, content);
    this.resetFilters = new Component(this.node, 'button', 'reset-button', 'Сброс фильтров');
    this.resetFilters.node.onclick = () => model.resetFilters();
    this.resetSettings = new Component(this.node, 'button', 'reset-button', 'Сброс настроек');
    this.resetSettings.node.onclick = () => model.resetSettings();
  }
}