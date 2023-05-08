import React from 'react'
import styles from "../App.module.css";

function InputWithLabel({
    id,
    value,
    type = 'text',
    onInputChange,
    isFocused,
    children,
  }) {
    const inputRef = React.useRef();

    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    return (
      <>
        <label htmlFor={id} className={styles.label}>{children}</label>
        &nbsp;
        <input
          id={id}
          ref={inputRef}
          type={type}
          value={value}
          onChange={onInputChange}
          className={styles.input}
        />
      </>
    );
}

export default InputWithLabel;