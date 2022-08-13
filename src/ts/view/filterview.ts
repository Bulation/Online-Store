import Component from "../common/component";
import { ViewButton } from "./viewbutton";
import { DataModel } from "../model";
import { SliderView } from "./sliderview";
import { Checkbox } from "./checkbox";
import { FilterState } from "../interfaces/filterstate";
import { FilterType } from "../types/types";
import { CallbackType } from "../types/types";

export class FilterView extends Component {
  rangeTitle: Component;
  pageCountSlider: SliderView;
  yearSlider: SliderView;
  priceSlider: SliderView;
  valueTitle: Component;
  categoriesContainer: Component;
  categoriesList: Component;
  fictionButton: ViewButton;
  computersButton: ViewButton;
  scienceButton: ViewButton;
  religionButton: ViewButton;
  philosophyButton: ViewButton;
  psychologyButton: ViewButton;
  sportsButton: ViewButton;
  firstButton: ViewButton;
  secondButton: ViewButton;
  thirdButton: ViewButton;
  fourthButton: ViewButton;
  fifthButton: ViewButton;
  onlyPopularContainer: Component;
  onlyPopularInput: Checkbox;
  ratingContainer: Component;
  ratingList: Component;
  slidersContainer: Component;
  filtersContainer: Component;
  buttons: (ViewButton)[];
  sliders: SliderView[];
  constructor(parentNode: HTMLElement, tagName: string, className: string, content: string, model: DataModel) {
    super(parentNode, tagName, className, content);
    this.slidersContainer = new Component(this.node, 'div', 'sliders-container', '');
    this.rangeTitle = new Component(this.slidersContainer.node, 'h2', 'title', 'Фильтры по диапазону');
    const callback: CallbackType = <T extends FilterType>(key: keyof FilterState, data: T): void => {
      model.setFilterValues(key, data)
    }
    this.pageCountSlider = new SliderView(this.slidersContainer.node, 'div', 'slider-container', '', 'Количество страниц', '71', '1000', 'pageCount', callback);
    this.yearSlider = new SliderView(this.slidersContainer.node, 'div', 'slider-container', '', 'Год публикации', '1960', '2022', 'publishedDate', callback);
    this.priceSlider = new SliderView(this.slidersContainer.node, 'div', 'slider-container', '', 'По цене', '1.99', '225', 'price', callback);
    this.sliders = [this.pageCountSlider, this.yearSlider, this.priceSlider]
    this.filtersContainer = new Component(this.node, 'div', 'filters-container', '');
    this.valueTitle = new Component(this.filtersContainer.node, 'h2', 'title', 'Фильтры по значению');
    this.categoriesContainer = new Component(this.filtersContainer.node, 'div', 'categories-container', 'Категория');
    this.categoriesList = new Component(this.categoriesContainer.node, 'ul', 'categories-list', '');
    
    this.fictionButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Fiction', 'category', 'Fiction', callback);
    this.computersButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Computers', 'category', 'Computers', callback);
    this.scienceButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Science', 'category', 'Science', callback);
    this.religionButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Religion', 'category', 'Religion', callback);
    this.philosophyButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Philosophy', 'category', 'Philosophy', callback);
    this.psychologyButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Psychology', 'category', 'Psychology', callback);
    this.sportsButton = new ViewButton(this.categoriesList.node, 'button', 'category-button', 'Sports & Recreation', 'category', 'Sports & Recreation', callback);
    this.ratingContainer = new Component(this.node, 'div', 'rating-container', 'Рейтинг');
    this.ratingList = new Component(this.ratingContainer.node, 'ul', 'rating-list', '');
    this.firstButton = new ViewButton(this.ratingList.node, 'button', 'rating-button', '1', 'averageRating', 1, callback);
    this.secondButton = new ViewButton(this.ratingList.node, 'button', 'rating-button', '2', 'averageRating', 2, callback);
    this.thirdButton = new ViewButton(this.ratingList.node, 'button', 'rating-button', '3', 'averageRating', 3, callback);
    this.fourthButton = new ViewButton(this.ratingList.node, 'button', 'rating-button', '4', 'averageRating', 4, callback);
    this.fifthButton = new ViewButton(this.ratingList.node, 'button', 'rating-button', '5', 'averageRating', 5, callback);
    this.onlyPopularContainer = new Component(this.node, 'div', 'popular-container', 'Только популярные');
    this.onlyPopularInput = new Checkbox(this.onlyPopularContainer.node, 'input', 'popular-input', '', 'popular', false, callback);
    (this.onlyPopularInput.node as HTMLInputElement).type = 'checkbox';
    this.buttons = [this.fictionButton, this.computersButton, this.scienceButton, this.religionButton, this.philosophyButton, this.psychologyButton, this.sportsButton, this.firstButton, this.secondButton, this.thirdButton, this.fourthButton, this.fifthButton];
  }
}