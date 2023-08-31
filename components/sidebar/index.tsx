import React from "react";
import { animated } from "react-spring";
import { useAnimation } from "./useAnimation";


const LOCAL_STORAGE_KEY = "isSidebarOpen";

function useSidebar() {
  const persistedState =
    typeof window === "undefined"
      ? false
      : localStorage.getItem(LOCAL_STORAGE_KEY) === "true";

  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(value => !value);

  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

  // Rehydrate with persisted data
  React.useEffect(() => {
    setIsOpen(persistedState);
  }, []);

  return { isOpen, toggle };
}

function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const styles = useAnimation(isOpen);

  return (
    <div className="sidebar">
      <animated.div className="sidebar" style={styles.sidebar}>
        Sidebar
      </animated.div>
      <animated.div className="main" style={styles.main}>
        <button className="btn" onClick={toggle}>
          Toggle
        </button>
      </animated.div>
    </div>
  );
}

export default Sidebar;
