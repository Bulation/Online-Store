import Component from './component';

export class Input extends Component {
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, type: string, placeholder: string, callback: (data: string) => void) {
    super(parentNode, tagName, className, content);
    (this.node as HTMLInputElement).type = type;
    (this.node as HTMLInputElement).placeholder = placeholder;
    this.node.oninput = () => callback((this.node as HTMLInputElement).value);
  }

  hide() {
    this.node.style.visibility = 'hidden';
  }

  show() {
    this.node.style.visibility = 'visible';
  }
}