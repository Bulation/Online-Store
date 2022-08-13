import { FilterState } from "../interfaces/filterstate";

export type FilterType = string | number | boolean | [number, number];
export type CallbackType = <T extends FilterType>(key: keyof FilterState, data: T) => void