import Component from './component';

export default class Popup extends Component {
  overlay: Component;
  closeButton: Component;
  constructor(parent: HTMLElement, tagName: string, className: string, content: string) {
    super(parent, tagName, className, content);
    this.overlay = new Component(this.node, 'div', 'popup-wrapper', 'Извините, все слоты заполнены');
    this.closeButton = new Component(this.overlay.node, 'button', 'popup-button', 'x');
    this.closeButton.node.onclick = () => this.destroy();
  }
}