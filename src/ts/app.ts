import Component from "./common/component";
import { FilterView } from "./view/filterview";
import { SortView } from "./view/sortview";
import { DataModel } from "./model";
import { Search } from "./view/search";
import { Reset } from "./view/reset";
import { CardView } from "./view/cardview";

export class App {
  model: DataModel;
  filterView: FilterView;
  sortView: SortView;
  search: Search;
  reset: Reset;
  cardsView: Array<CardView>;
  header: Component;
  title: Component;
  cartView: Component;
  cardsContainer: Component;
  main: Component;
  footer: Component;
  footerContainer: Component;
  user: Component;
  time: Component;
  logo: Component;
  node: HTMLElement;
  leftMenu: Component;

  constructor(parentNode: HTMLElement) {
    this.node = parentNode;
    this.model = new DataModel();
    this.cardsView = [];
    this.header = new Component(this.node, 'header', 'header', '');
    this.title = new Component(this.header.node, 'h1', 'title', 'Online books store');
    this.cartView = new Component(this.header.node, 'div', 'cart', '0');
    this.main = new Component(this.node, 'main', 'main', '');
    this.leftMenu = new Component(this.main.node, 'div', 'left-menu', '');
    this.filterView = new FilterView(this.leftMenu.node, 'div', 'filter-container', '', this.model);
    this.sortView = new SortView(this.leftMenu.node, 'div', 'sort-container', '', this.model);
    this.search = new Search(this.leftMenu.node, 'div', 'search-container', '', this.model);
    this.reset = new Reset(this.leftMenu.node, 'div', 'reset-container', '', this.model);
    this.cardsContainer = new Component(this.main.node, 'div', 'cards-container', '');
    this.model.onUpdate = (data) => {
      this.cardsView.forEach((card) => card.destroy());
      this.cardsView = [];
      this.cardsContainer.node.textContent = '';
      if (!data.length) {
        this.cardsContainer.node.textContent = 'Совпадений нет';
      }
      data.forEach((item) => {
        this.cardsView.push(new CardView(this.cardsContainer.node, 'div', 'card', '', item, this.model));
      })
      this.filterView.buttons.forEach((el) => {
        const value = this.model.getFilterValues(el.key);
        el.setClass(value === el.data);
      })
      const checkboxValue = this.model.getFilterValues(this.filterView.onlyPopularInput.key) as boolean;
      this.filterView.onlyPopularInput.setClass(checkboxValue);
      this.filterView.sliders.forEach((el) => {
        const value = this.model.getFilterValues(el.key) as [number, number];
        el.setData(value);
      })
      this.sortView.options.forEach((el) => {
        const value = this.model.getSortState(el.key);
        el.setSelect(value);
      })
    }
    this.model.updateCart = (cart: number) => {
      this.cartView.node.textContent = `Товаров в корзине: ${String(cart)}`;
    }
    this.model.load()
    this.footer = new Component(this.node, 'footer', 'footer', '');
    this.footerContainer = new Component(this.footer.node, 'div', 'footer-container', '');
    this.user = new Component(this.footerContainer.node, 'a', '', 'Bulation');
    (this.user.node as HTMLAnchorElement).href = "https://github.com/Bulation";
    this.time = new Component(this.footerContainer.node, 'time', '', '2022');
    this.logo = new Component(this.footerContainer.node, 'a', 'footer__logo', '');
    (this.logo.node as HTMLAnchorElement).href = "https://rs.school/js";
  }
}