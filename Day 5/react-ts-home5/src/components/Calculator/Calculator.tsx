import React, { useState } from "react";
import styles from "./Calculator.module.css";

const OPERATORS = ["+", "-", "×", "÷"] as const;
type Operator = typeof OPERATORS[number];

const isOperator = (val: string): val is Operator =>
  OPERATORS.includes(val as Operator);

export const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleButtonClick = (val: string) => {
    if (val === "C") {
      setExpression("");
      setResult("");
      return;
    }
    if (val === "=") {
      try {
        const exp = expression.replace(/×/g, "*").replace(/÷/g, "/");
        // Prevent eval injection
        if (/[^0-9+\-*/.]/.test(exp)) {
          setResult("Error");
          return;
        }
        // eslint-disable-next-line no-eval
        const evalResult = eval(exp);
        if (!isFinite(evalResult)) {
          setResult("Error");
        } else {
          setResult(evalResult.toString());
        }
      } catch {
        setResult("Error");
      }
      return;
    }
    // Prevent multiple operators or decimals
    if (isOperator(val)) {
      if (!expression || isOperator(expression.slice(-1))) return;
    }
    if (val === ".") {
      // Prevent multiple decimals in one number
      const parts = expression.split(/[+\-×÷]/);
      const last = parts[parts.length - 1];
      if (last.includes(".")) return;
      if (!last) return setExpression(expression + "0.");
    }
    setExpression(expression + val);
    setResult("");
  };

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", ".", "C", "+",
    "=", // Will be styled to span 4 columns
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div className={styles.expression}>{expression || "0"}</div>
        <div className={styles.result}>{result}</div>
      </div>
      <div className={styles.buttons}>
        {buttons.slice(0, 16).map((btn) => (
          <button
            key={btn}
            className={
              isOperator(btn)
                ? styles.operator
                : btn === "C"
                ? styles.clear
                : styles.button
            }
            onClick={() => handleButtonClick(btn)}
            type="button"
          >
            {btn}
          </button>
        ))}
        <button
          className={styles.equals}
          onClick={() => handleButtonClick("=")}
          type="button"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;