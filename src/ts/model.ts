import { IData } from "./interfaces/data";
import { SortState } from "./interfaces/sortstate";
import { FilterState } from "./interfaces/filterstate";
import books from "./common/books";

export class DataItem implements IData {
  title: string;
  publishedDate: number;
  pageCount: number;
  category: string;
  averageRating: number;
  imageLink: string;
  price: number;
  popular: boolean;
  cart: boolean;
  id: number;

  constructor(DataItem: IData) {
    if (typeof DataItem.title !== "string") {
      throw new Error('Title is not string');
    }
    this.title = DataItem.title;

    if (typeof DataItem.publishedDate !== "string") {
      throw new Error('Date is not string');
    }
    this.publishedDate = new Date(DataItem.publishedDate).getFullYear();

    if (typeof DataItem.pageCount !== "number") {
      throw new Error('Count of pages is not number');
    }
    this.pageCount = DataItem.pageCount;

    if (typeof DataItem.category !== "string") {
      throw new Error('Category is not string');
    }
    this.category = DataItem.category;

    if (typeof DataItem.averageRating !== "number") {
      throw new Error('Rating is not number');
    }
    this.averageRating = DataItem.averageRating;

    if (typeof DataItem.imageLink !== "string") {
      throw new Error('Link of image is not string');
    }
    this.imageLink = DataItem.imageLink;

    if (typeof DataItem.price !== "number") {
      throw new Error('Price is not number');
    }
    this.price = DataItem.price;

    if (typeof DataItem.popular !== "boolean") {
      throw new Error('popularity is not boolean');
    }
    this.popular = DataItem.popular;

    if (typeof DataItem.cart !== "boolean") {
      throw new Error('cart is not boolean');
    }
    this.cart = DataItem.cart;

    if (typeof DataItem.id !== "number") {
      throw new Error('id is not boolean');
    }
    this.id = DataItem.id;
  }
}

export class DataModel {

  private sortState: SortState = {
    name: false,
    reverseName: false,
    year: false,
    reverseYear: false,
    price: false,
    reversePrice: false
  };
  private sortCallbacks = {
    name: () => {
      return function (a: IData, b: IData) {
        return a.title.localeCompare(b.title);
      }
    },
    reverseName: () => {
      return function (a: IData, b: IData) {
        return b.title.localeCompare(a.title);
      }
    },
    year: () => {
      return function (a: IData, b: IData) {
        return a.publishedDate - b.publishedDate;
      }
    },
    reverseYear: () => {
      return function (a: IData, b: IData) {
        return b.publishedDate - a.publishedDate;
      }
    },
    price: () => {
      return function (a: IData, b: IData) {
        return a.price - b.price;
      }
    },
    reversePrice: () => {
      return function (a: IData, b: IData) {
        return b.price - a.price;
      }
    }
  }
  private filterValues: FilterState = {
    category: '',
    averageRating: 0,
    popular: false,
    pageCount: [71, 1000],
    publishedDate: [1960, 2022],
    price: [1, 225]
  }

  private defaultFilterValues: FilterState = {
    category: '',
    averageRating: 0,
    popular: false,
    pageCount: [71, 1000],
    publishedDate: [1960, 2022],
    price: [1, 225]
  }

  private _cartModel = 0;
  private _currentData: Array<IData> = [];
  private _data: Array<IData> = [];

  set cartModel (val) {
    this._cartModel = val;
  }

  get cartModel() {
    return this._cartModel;
  }

  set currentData (val) {
    this._currentData = val;
  }

  get currentData() {
    return this._currentData;
  }

  set data (val) {
    this._data = val;
  }

  get data() {
    return this._data;
  }

  constructor() {
    window.onbeforeunload = () => {
      localStorage.setItem('data', JSON.stringify(this.data));
      localStorage.setItem('sortState', JSON.stringify(this.sortState));
      localStorage.setItem('filterValues', JSON.stringify(this.filterValues));
    }
  }

  load() {
    if (localStorage.getItem('data') !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));
      this.init();
    } else {
      this.data = books;
    }
    this.currentData = this.data.slice();
    this.init();
  }
  
  private init() {
    if (localStorage.getItem('sortState') !== null) {
      this.sortState = JSON.parse(localStorage.getItem('sortState'));
    }
    if (localStorage.getItem('filterValues') !== null) {
      this.filterValues = JSON.parse(localStorage.getItem('filterValues'));
      this.filter();
    } else {
      this.onUpdate(this.data);
    }
    this.cartModel = this.data.filter((el) => el.cart === true).length;
    this.updateCart(this.cartModel)
  }

  getFilterValues(key: keyof FilterState) {
    return this.filterValues[key]
  }

  setFilterValues<T extends keyof FilterState>(key: T, val: FilterState[T]) {
    if (this.filterValues[key] === val) {
      this.filterValues[key] = this.defaultFilterValues[key];
    } else {
      this.filterValues[key] = val;
    }
    this.filter();
  }

  getSortState(key: keyof SortState) {
    return this.sortState[key];
  }

  setSortState<T extends keyof SortState>(key: T, val: SortState[T]) {
    Object.keys(this.sortState).forEach((key) => {
      this.sortState[key as keyof SortState] = false;
    })
    this.sortState[key] = val;
    this.sort();
  }

  setCart(onCart: boolean, id: number) {
    this.data[id].cart = onCart;
    this._cartModel = this.data.filter((el) => el.cart === true).length;
    this.updateCart(this._cartModel);
  }

  onUpdate: (data: Array<IData>) => void;
  updateCart: (cart: number) => void;

  private filter() { //переделать
    this.currentData = this.data.slice();
    if (this.filterValues.category) {
      this.currentData = this.currentData.filter((item) => item.category === this.filterValues.category);
    }
    if (this.filterValues.averageRating) {
      this.currentData = this.currentData.filter((item) => item.averageRating >= this.filterValues.averageRating && item.averageRating < this.filterValues.averageRating + 1);
    }
    if (this.filterValues.popular) {
      this.currentData = this.currentData.filter((item) => item.popular === this.filterValues.popular);
    }
    if (this.filterValues.pageCount) {
      this.currentData = this.currentData.filter((item) => item.pageCount >= this.filterValues.pageCount[0] && item.pageCount <= this.filterValues.pageCount[1]);
    }
    if (this.filterValues.publishedDate) {
      this.currentData = this.currentData.filter((item) => item.publishedDate >= this.filterValues.publishedDate[0] && item.publishedDate <= this.filterValues.publishedDate[1]);
    }
    if (this.filterValues.price) {
      this.currentData = this.currentData.filter((item) => item.price >= this.filterValues.price[0] && item.price <= this.filterValues.price[1]);
    }
    this.sort();
    this.onUpdate(this.currentData);
  }

  resetFilters() {
    this.filterValues = {
      category: '',
      averageRating: 0,
      popular: false,
      pageCount: [71, 1000],
      publishedDate: [1960, 2022],
      price: [1, 225]
    }
    this.currentData = this.data.slice();
    this.sort();
    this.onUpdate(this.currentData);
  }

  resetSettings() {
    this.sortState = {
      name: false,
      reverseName: false,
      year: false,
      reverseYear: false,
      price: false,
      reversePrice: false
    }
    this.data.forEach((el) => el.cart = false);
    this.resetFilters();
    this.cartModel = this.data.filter((el) => el.cart === true).length;
    this.updateCart(this.cartModel)
    localStorage.clear();
  }

  search(data: string) {
    if (data) {
      data = data.toLowerCase();
      this.onUpdate(this.currentData.filter((el) => el.title.toLowerCase().includes(data)));
    } else {
      this.onUpdate(this.currentData)
    }
  }

  private sort() {
    Object.keys(this.sortState).forEach((key) => {
      if (this.sortState[key as keyof SortState]) {
        this.currentData.sort(this.sortCallbacks[key as keyof SortState]());
      }
    })
    this.onUpdate(this.currentData);
  }
}