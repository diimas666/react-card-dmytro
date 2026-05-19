import React, { useState } from "react";
import Button from "./components/Button/Button";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button
      type="button"
      className="counter"
      onClick={() => setCount((count) => count + 1)}
    >
      Count is {count}
    </Button>
  );
}

export default Counter;
