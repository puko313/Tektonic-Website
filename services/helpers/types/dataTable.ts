export interface LampData {
  name: string;
  values?: string | number;
  calories?: string | number;
  fat?: string | number;
}

export interface DataTableProps {
  data: any;
  width?: number;
  tableName: string;
  firstArgument: string;
  secondArgument: string;
  className?: string;
  rowOne?: string;
  rowTwo?: string;
  rowThree?: string;
  inactivationRate?: number[][];
  id?: string;
}

export interface TableColumnType {
  name: string;
  code: string;
}

export const LampData: LampData[] = [
  { name: "Lamp Model", calories: "-", fat: "-" },
  { name: "Lamp lower left en x , mm", calories: "-", fat: "-" },
  { name: "Lamp lower left end y, mm", calories: "-", fat: "-" },
];

export const CoilWidthForm: LampData[] = [
  { name: "Coil Width", calories: "-", fat: "mm" },
  { name: "Coil Height", calories: "-", fat: "mm" },
  { name: "Distance between lamp and coil", calories: "-", fat: "mm" },
  {
    name: "Downstream/Upstream coefficient (1if Downstream)",
    calories: "-",
    fat: "",
  },
  { name: "Number of lamp rows", calories: "-", fat: "" },
  { name: "Number of lamp columns", calories: "-", fat: "" },
  { name: "Number of lamps", calories: "-", fat: "" },
  { name: "Total Input Power", calories: "-", fat: "W" },
];

export const minimumUvForm: LampData[] = [
  {
    name: "Minimum UV Irradiation Intensity",
    calories: "-",
    fat: "\u03BCW/cm2",
  },
  {
    name: "Avergae UV Irradiation Intensity",
    calories: "-",
    fat: "\u03BCW/cm2",
  },
  {
    name: "Maximum UV Irradiation Intensity",
    calories: "-",
    fat: "\u03BCW/cm2",
  },
];

export const aspergillusForm: LampData[] = [
  { name: "ASPERGILLUS NIGER", calories: "-", fat: "-" },
  { name: "Maximum", calories: "-", fat: "minute" },
  { name: "Average", calories: "-", fat: "minute" },
  { name: "Minimum", calories: "-", fat: "minute" },
];

export const LayersData = [
  {
    ModelName: "SGAirUV12",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV18",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV24",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV30",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV40",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV50",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV60",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV18Q",
    Number_of_Lamps: 4,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
];
