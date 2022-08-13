import Component from '../common/component';
import { DataItem, DataModel } from '../model';
import Popup from "../common/popup"

export class CardView extends Component {
  image: Component;
  title: Component;
  date: Component;
  pageCount: Component;
  category: Component;
  rating: Component;
  price: Component;
  onCart: boolean;
  id: number;
  popular: Component;
  addButton: Component;
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, data: DataItem, model: DataModel) {
    super(parentNode, tagName, className, content);
    this.image = new Component(this.node, 'img', 'card__img', '');
    (this.image.node as HTMLImageElement).src = data.imageLink;
    this.title = new Component(this.node, 'h3', 'card__title', data.title);
    this.date = new Component(this.node, 'p', 'card__date', `Дата публикации: ${data.publishedDate}`);
    this.pageCount = new Component(this.node, 'p', 'card__page-count', `Количество страниц: ${data.pageCount}`);
    this.category = new Component(this.node, 'p', 'card__category', `Категория: ${data.category}`);
    this.rating = new Component(this.node, 'p', 'card__category', `Рейтинг: ${data.averageRating}`);
    this.price = new Component(this.node, 'p', 'card__price', `Цена: ${data.price}$`);
    this.popular = new Component(this.node, 'p', 'card__price', `Популярность: ${data.popular}`);
    this.addButton = new Component(this.node, 'button', 'card__button', `Добавить в корзину`);
    this.onCart = data.cart;
    if (this.onCart) {
      this.addButton.node.textContent = 'Убрать из корзины';
      this.node.classList.add('on-cart');
    }
    this.id = data.id;
    this.node.onclick = () => {
      if (model.cartModel === 20 && !this.onCart) {
        new Popup(document.body, 'div', 'popup', '')
      } else {
        this.onCart = !this.onCart;
        if (this.onCart) {
          this.addButton.node.textContent = 'Убрать из корзины';
        } else {
          this.addButton.node.textContent = 'Добавить в корзину';
        }
        this.node.classList.toggle('on-cart');
        model.setCart(this.onCart, this.id);
      }
    }
  }
}