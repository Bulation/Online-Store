export interface FilterState {
  category: string,
  averageRating: number,
  popular: boolean,
  pageCount: [number, number],
  publishedDate: [number, number],
  price: [number, number]
}