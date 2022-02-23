import { useEffect, useState, useContext } from "react";
import GlobalState from "../../Context/Context";
import s from "./Textbar.module.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Textbar = () => {
  const { setText } = useContext(GlobalState);
  const [innerText, setInnerText] = useState("");
  const debouncedValue = useDebounce(innerText, 500);

  const handleChange = (e) => {
    setInnerText(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      setText(debouncedValue);
    }
  }, [debouncedValue, setText]);

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        maxLength={20}
        className={s.input}
        type="text"
        name=""
        id=""
        placeholder="Type your text here..."
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};

export default Textbar;
