export enum TableValueTypes {
  DATE = 'DATE',
}

export type TableColumn = {
  title: string;
  valueKey: string;
  valueType?: TableValueTypes.DATE;
};

export type TableAction = {
  key: string;
  action: () => void;
};
