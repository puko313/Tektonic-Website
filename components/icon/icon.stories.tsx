import { storiesOf } from "@storybook/react";
import Icon from ".";

import styles from "./icon.module.scss";

storiesOf("Icon", module).add("Icon component", () => {
  return (
    <div className={styles.stories}>
      <Icon width={200} height={100} name="arrow-right.svg" />
    </div>
  );
});
