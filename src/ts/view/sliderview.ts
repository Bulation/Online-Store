import Component from "../common/component";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { FilterState } from "../interfaces/filterstate";
import { CallbackType } from "../types/types";

export class SliderView extends Component {
  subtitle: Component;
  sliderContainer: Component;
  sliderMin: Component;
  sliderMax: Component;
  slider: Component;
  key: keyof FilterState;
  data: [number, number];
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, subtitle: string, min: string, max: string, key: keyof FilterState, callback: CallbackType) {
    super(parentNode, tagName, className, content);
    this.subtitle = new Component(this.node, 'h3', 'title', subtitle);
    this.sliderContainer = new Component(this.node, 'div', 'slider-wrapper', '');
    this.sliderMin = new Component(this.sliderContainer.node, 'div', 'min', min);
    this.slider = new Component(this.sliderContainer.node, 'div', 'slider', '');
    this.key = key;
    this.data = [Number(min), Number(max)];
    noUiSlider.create(this.slider.node, {
      start: [min, max],
      connect: true,
      step: 1,
      range: {
        'min': Number(min),
        'max': Number(max)
      }
    });
    this.sliderMax = new Component(this.sliderContainer.node, 'div', 'max', max);
    (this.slider.node as noUiSlider.target).noUiSlider?.on('change', (values) => { //при ивенте update оно срабатывает сразу при создании, из-за чего возникает ошибка
      this.sliderMin.node.innerHTML = String(values[0]).slice(0, -3);
      this.sliderMax.node.innerHTML = String(values[1]).slice(0, -3);
      this.data = [Math.floor(Number(values[0])), Math.floor(Number(values[1]))]
      callback(this.key, this.data)
    });
  }

  setData(arr: [number, number]) {
    (this.slider.node as noUiSlider.target).noUiSlider?.set([arr[0], arr[1]]);
    this.sliderMin.node.innerHTML = String(arr[0])
    this.sliderMax.node.innerHTML = String(arr[1])
  }
}