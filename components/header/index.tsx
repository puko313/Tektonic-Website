import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "../icon";
import { useRouter } from "next/router";

import styles from "./header.module.scss";

const navLists = [
  { name: "HOME", href: "/home" },
  { name: "TEK ALIGN", href: "/tekAlign" },
  { name: "TEK DESIGN", href: "/" },
  { name: "TEK EDU", href: "/" },
  { name: "TEK STORE", href: "/" }
];


export default function Header(): JSX.Element {
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useRouter();

  useEffect(() => {
    const windowWidth = window?.innerWidth;

    const closeHamburgerMenu = () => {
      if (windowWidth > 1024) {
        setShowHamburger(false);
      }
    };

    window.addEventListener('resize', closeHamburgerMenu);
    return () => window.removeEventListener("resize", closeHamburgerMenu);
  }, []);

  useEffect(() => {

    const checkIfClickedOutside = (e: MouseEvent) => {

      if (showHamburger && ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setShowHamburger(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showHamburger]);


  const closeHamburger = (dropDown: boolean): void => {
    if (dropDown) {
      setShowHamburger(!showHamburger);
    }
  };

  return (
    <header className={styles.headerContainer} ref={ref}>
      <div className={styles.inner}>
        <nav className={styles.navbar}>
          <ul className={styles.navigationBox}>
            {navLists.map((list) => (
              <li key={list.name}>
                <Link scroll={!(list.name === 'Services')} href={list.href} passHref>
                  <span
                    className={`${location.asPath === list.href && styles.active}`}
                  >
                   { list.name }
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header >
  );
}
