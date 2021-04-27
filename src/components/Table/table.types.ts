export enum TableValueTypes {
  DATE = 'DATE',
}

export type TableColumn = {
  title: string;
  valueKey: string;
  valueType?: TableValueTypes.DATE;
  onClick?: TableClickSettings;
};

export type TableClickSettings = {
  type: 'link';
  linkPrefix: string;
  linkKey: string;
};
export type TableAction = {
  key: string;
  action: () => void;
};
