import { useSpring, to } from "react-spring";

const DEFAULT_WIDTH = 200;

export function useAnimation(isOpen) {
  const { translate } = useSpring({
    translate: [isOpen ? 0 : -100],
  });
  const sidebar = {
    transform: to(translate, x => `translateX(${x}%)`),
    width: DEFAULT_WIDTH,
  };
  const main = useSpring({
    marginLeft: isOpen ? DEFAULT_WIDTH : 0,
  });

  return { sidebar, main };
}
