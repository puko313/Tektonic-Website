import { createContext, useContext } from "react";
import { useRouter } from "next/router";
import { getItemFromLocalStorage } from "services/common/localStorageService";

import { navBarPaths, localStorageKeys } from "../../helpers";

export const AuthApiContext = createContext(null);

const withAuth = (WrappedComponent) => {
  return (props: JSX.IntrinsicAttributes) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const accessToken = getItemFromLocalStorage(localStorageKeys.token);

      if (accessToken) {
        return <WrappedComponent {...props} />;
      }
      // router.replace(navBarPaths.login); // redirect
    }
  };
};

export default withAuth;
