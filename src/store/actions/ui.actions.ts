import {
  ErrorType,
  ResetErrors,
  SetError,
  SetLoader,
  uiActionTypes,
  UILoaders,
  UnsetLoader,
} from '../types/ui.types';

export function setError(error: ErrorType): SetError {
  return {
    type: uiActionTypes.SET_ERROR,
    payload: error,
  };
}
export function resetErrors(): ResetErrors {
  return {
    type: uiActionTypes.UNSET_ERROR,
  };
}

export function setLoader(loaders: UILoaders[]): SetLoader {
  return {
    type: uiActionTypes.SET_LOADER,
    payload: loaders,
  };
}
export function unsetLoader(loaders: UILoaders[]): UnsetLoader {
  return {
    type: uiActionTypes.UNSET_LOADER,
    payload: loaders,
  };
}
