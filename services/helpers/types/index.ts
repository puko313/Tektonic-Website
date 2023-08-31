export interface EnvVariables {
  apiUrl: string;
  googleAppId: string;
}

export enum ReportTypes {
  COILCLEAN = "CoilClean",
  BIOWALL = "Biowall",
}

export enum CoilTypeEnum {
  FEShow = "CoilClean",
  BEReqBody = "coilclean",
  BEResult = "CoilReports",
}

export enum BioWallTypeEnum {
  FEShow = "Biowall",
  BEReqBody = "biowall",
  BEResult = "BiowallReports",
}

export enum InactivationFields {
  INACTPASS = "inactPasses",
  INACTRATE = "inactRate",
  MICROORGANISMS = "microOrganisms",
  LAYERS = "layers",
}

export enum CoilReportParameters {
  WIDTH = "widthX",
  HEIGHT = "heightY",
  MAXDISTANCE = "maxDistToCoil",
}

export enum UserType {
  MANUFACTURER = "Manufacturer",
  CONSULTENGINEER = "Consult Engineer",
  CONTRACTOR = "Contractor",
  OTHER = "Other",
}

type IncomingData = Array<Array<string | number> | number>;
type LampObjects = Record<string, Array<string | number>>;

export interface PdfUserInfo {
  name: string;
  surname: string;
  role: string;
  factory: string;
}

export interface ICoilCleanData {
  userInfo: PdfUserInfo;
  data: IncomingData;
  images: Record<string, string>;
  coil_installation: LampObjects;
  tableStateValues: Record<string, any>;
  lamp_side_view: string;
  reportType: string;
  reportInfo: ReportInfo;
  optimizeTableRows: any;
}

export interface LampInstallationProps {
  images: any;
  isLoading: boolean;
  tableValues?: any[];
}

export interface ReportInfo {
  reportName: string;
  reportType: string;
  ahu: string;
  place: string;
  department: string;
  customerName: string;
  task: string;
  planningCompany: string;
  plannerName: string;
  airHandlingUnit?: string;
  projectName?: string;
}

export interface ReportCheckings {
  microOrganism?: boolean;
  position?: boolean;
  optimizeArray?: boolean;
  disable?: boolean;
  alert?: boolean;
  isSaved?: boolean;
  isCalculation?: boolean;
  loading?: boolean;
  isIntactPassesCorrect?: boolean;
  isIntactRateCorrect?: boolean;
  layersNumberCheck?: boolean;
}

export interface TableDefaultValues {
  widthX: number;
  heightY: number;
  downstreamCoeff: number;
  maxDistToCoil: number;
  requiredInactivationRate: number;
  maxInactivationTime: number;
  susceptibilityCoefficient: number;
  minimumUVIrrIntensity: number;
  optimizeOption: [];
  reflectionCoeff: number;
  minDistWallX: number;
  minDistWallY: number;
  microorganismOption: string;
  optType: string;
  isOptimized?: boolean;
}

export interface DefaultBiowallCheckings {
  isIntactPassesCorrect: boolean;
  isIntactRateCorrect: boolean;
  isTargetMicroOrganismCorrect: boolean;
  isLayersCorrect: boolean;
  layersNumberCheck: boolean;
  isCalculation: boolean;
  isSaved: boolean;
  disable: boolean;
  loading: boolean;
  nonOptimizeDisable: boolean;
  alert: boolean;
}

export interface DefaultCoilChecking {
  microOrganism: boolean;
  position: boolean;
  optimizeArray: boolean;
  disable: boolean;
  alert: boolean;
  isSaved: boolean;
  isCalculation: boolean;
  loading: boolean;
}

export interface TableStateValues {
  downstreamCoeff?: number;
  maxDistToCoil?: number;
  requiredInactivationRate?: number;
  maxInactivationTime?: number;
  minimumUVIrrIntensity?: number;
  minDistWallX?: number;
  minDistWallY?: number;
  optType?: string;
  optimizeOption?: string | string[];
  widthX: number;
  heightY: number;
  lengthZ?: number;
  reflectionCoeff?: number;
  inactPasses?: number;
  susceptibilityCoefficient: number | number[];
  airFlow?: number;
  microorganismOption: string | string[];
  inactRate?: number;
  layersData?: any[];
  reportName?: string;
  isOptimized?: boolean;
}

export interface MicroOrganism {
  name: string;
  sum: number;
}

export interface Types {
  FEShow: string;
  BEReqBody: string;
  BEResult: string;
}

export interface ReportDataType {
  reportType: ReportTypes;
  projectName?: string;
  reportName?: string;
  airHandlingUnit: string;
  place: string;
  customerName: string;
  department: string;
}

export interface SelectedReportType {
  CoilClean: string;
  Biowall: string;
}

export interface EfficiencyDescriptionTypes {
  background: string;
  description: string;
}

export interface AuxiliaryColorsTypes {
  cheapAndEfficient: string;
  energyEfficient: string;
  cheapest: string;
}
