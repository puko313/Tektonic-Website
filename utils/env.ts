export interface EnvVariables {
    imageKitUrl: string;
  }
  
  const env: EnvVariables = {
    imageKitUrl: process.env.NEXT_PUBLIC_IMAGEKIT_URL ?? "https://ik.imagekit.io/2zlgs27bjo",
  };
  
  export default env;
  