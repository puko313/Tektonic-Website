import Image from "../image";
import IconProps from "./types";

export default function Icon({
  name,
  width = 20,
  height = 15,
  ...rest
}: IconProps) {
  return (
    <Image width={width} height={height} src={`/icons/${name}`} alt={name} {...rest} />
  );
}
