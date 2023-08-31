import { SelectedReportType } from "./types";

export const imageType = "data:image/png;base64";

export const localStorageKeys = {
  token: "token",
  userType: "userType",
  role: "role",
};

export const navBarPaths = {
  inputPage: "/",
  history: "/reports-history",
  login: "/login",
  signUp: "/signup",
  profile: "/profile",
  changePassword: "/change-password",
  reportEdit: "/edit/[id]",
  logout: "/logout",
  users: "/users",
};

export const publicRoutes = ["/login", "/signup", "/recoveryPassword"];
export const routesWithoutSidebar = ["/change-password", ...publicRoutes];
export const defaultUserImage = "/icons/userDefaultImage.svg";

export const defaultWarningModalText = {
  defaultWarningMessage:
    "If you leave the page without completing the calculation, all data entered by you will be lost.",
  defaultCloseButtonText: "Stay",
  defaultAgreeButtonText: "Get out anyway",
  defaultRemoveMessage:
    "You will not be able to recover a deleted report. Are you sure?",
  defaultRemoveCloseButtonText: "Cancel",
  defaultRemoveAgreeButtonText: "Remove Report",
  defaultRemoveUserButtonText: "Remove User",
  defaultEditWarningMessage:
    "If you leave the edit page without saving, all changes will be lost",
  inactPasses: "Inactivation Passes should be between 1 and 100",
  inactRate: "Inactivation Rate should be between 2 and 10",
  microOrganisms: "At least one microorganism must be selected",
  widthX: "Coil Width should be between 200 and 10000",
  heightY: "Coil Height should be between 200 and 10000",
  maxDistToCoil: "Max Distance to Coil should be more than 5",
  coilDistanceUser:
    "Only factory and constructor can do the changes Max Distance of Coil",
  layers: "The number of layers must be an integer and greater than zero",
  optimize: " No configuration found for given parameters",
  defaultRemoveUser:
    "You will not be able to recover a deleted user. Are you sure?",
  removeUserMessage: "User successfully deleted",
  editUserMessage: "User successfully updated",
};

export const endpoints = {
  login: "/login",
  signup: "/signup",
  signUp: "/signup",
  changePassword: "/change_password",
  images: "/images",
  googleLogin: "/google_login",
  googleSignUp: "/google_signup",
  logout: "/logout",
  optimize: "/optimize",
  getUser: "/get",
  edit: "/edit",
  delete: "/delete",
  recover: "/recover-password",
  forgotPassword: "/forgot-password",
  report: "/history",
  imagesData: "/images",
  biowall_images: "/biowall-images",
  optimize_biowall: "optimize_biowall",
  users: "/users",
};

export const MicroOrganismsMenuProps = {
  PaperProps: {
    style: {
      maxHeight: 800,
      width: "auto",
    },
  },
};

export const downstreamCoeffValue = {
  valueMin: 0.85,
  valueMax: 1,
};

export const selectedReport: SelectedReportType = {
  CoilClean: "CoilReports",
  Biowall: "BiowallReports",
};
