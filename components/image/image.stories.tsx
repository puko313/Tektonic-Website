import { storiesOf } from "@storybook/react";
import Image from ".";

storiesOf("Image", module).add("Image component", () => {
  return (
    <div>
      <Image width={200} height={200} src="solana" alt="solana"/>
    </div>
  );
});
