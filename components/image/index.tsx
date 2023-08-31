import NextImage from "next/image";
import { useEffect, useState } from "react";
import env from "../../utils/env";
import ImageProps from "./types";

const imageKitLoader = ({ src, width, quality }: any) => {
  const { imageKitUrl } = env;

  let srcValue = src;
  if (srcValue[0] === "/") { srcValue = srcValue.slice(1); };
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  let urlEndpoint = imageKitUrl;
  if (urlEndpoint[urlEndpoint.length - 1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${srcValue}?tr=${paramsString}`;
};

export default function Image({ width, height, src, ...rest }: ImageProps) {
  const [imageWidth, setImageWidth] = useState({ width, height });

  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = () => {
    const widthSize = hasWindow ? window.innerWidth : null;
    const heightSize = hasWindow ? window.innerHeight : null;
    return {
      width: widthSize,
      height: heightSize,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect((): any => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };
    return null;
  }, [hasWindow]);

  useEffect(() => {
    if (windowDimensions.width) {
      const windowInerrWidth = windowDimensions.width;
      if ((!width || (width > windowInerrWidth)) && windowInerrWidth < 800) {
        const newHeight = (height || 1) / ((width || 1) / (windowInerrWidth || 1));
        setImageWidth({ width: windowInerrWidth, height: newHeight });
      };
    };
  }, [windowDimensions]);


  return <NextImage loader={(value) => imageKitLoader({ ...value, width: imageWidth.width })} quality={200} width={imageWidth.width} height={imageWidth.height} alt={rest.about} src={`public${src}`} draggable={false} {...rest} loading="lazy" />;
}
