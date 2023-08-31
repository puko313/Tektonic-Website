import { EnvVariables } from "../types";

const env: EnvVariables = {
  apiUrl: process.env.NEXT_PUBLIC_REACT_APP_API_URL ?? "http://127.0.0.1:5000",
  googleAppId:
    process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_ID ??
    "848216577942-13rurtahbpqh9sjefnre5i97ssk1r8mu.apps.googleusercontent.com",
};

export default env;
