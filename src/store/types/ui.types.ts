import { DateRangeType } from '../../components/RangeDatePicker';

export enum uiActionTypes {
  SET_LOADER = 'SET_LOADER',
  UNSET_LOADER = 'UNSET_LOADER',
  SET_ERROR = 'SET_ERROR',
  UNSET_ERROR = 'UNSET_ERROR',
  SET_DATERANGE = 'SET_DATERANGE',
}
export type ErrorType = { key: UIErrors; message: string };
export interface SetError {
  type: typeof uiActionTypes.SET_ERROR;
  payload: ErrorType;
}
export interface SetDateRange {
  type: typeof uiActionTypes.SET_DATERANGE;
  payload: DateRangeType;
}

export interface ResetErrors {
  type: typeof uiActionTypes.UNSET_ERROR;
}

export interface SetLoader {
  type: typeof uiActionTypes.SET_LOADER;
  payload: UILoaders[];
}

export interface UnsetLoader {
  type: typeof uiActionTypes.UNSET_LOADER;
  payload: UILoaders[];
}

export type UILoaders = keyof loaders;
export type UIErrors = keyof errors;

export type UIActions =
  | SetLoader
  | UnsetLoader
  | SetError
  | ResetErrors
  | SetDateRange;

export interface uiReducerState {
  isLoading: Partial<loaders>;
  errors: Partial<errors>;
  filterRange: DateRangeType;
}

type errors = {
  getProducts: string;
  saveInvoice: string;
};
type loaders = {
  getProducts: boolean;
  saveInvoice: boolean;
};
