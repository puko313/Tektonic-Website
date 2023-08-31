import { DefaultBiowallCheckings, DefaultCoilChecking } from "../types/index";

export const defaultBiowallCheckings: DefaultBiowallCheckings = {
  isIntactPassesCorrect: false,
  isIntactRateCorrect: false,
  isTargetMicroOrganismCorrect: false,
  isLayersCorrect: false,
  layersNumberCheck: true,
  isCalculation: false,
  isSaved: false,
  disable: true,
  nonOptimizeDisable: false,
  loading: false,
  alert: false,
};

export const defaultCoilChecking: DefaultCoilChecking = {
  microOrganism: true,
  position: true,
  optimizeArray: true,
  disable: true,
  alert: false,
  isSaved: false,
  isCalculation: false,
  loading: false,
};
