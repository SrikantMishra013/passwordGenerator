import "./styles.css";
import { useCallback, useEffect, useState, useRef } from "react";
export default function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()~`[]{}";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="input">
        <input type="text" value={password} ref={passwordRef} readOnly />
        <button className="btn" onClick={copyPasswordToClipboard}>
          copy
        </button>
      </div>
      <div className="field">
        <input
          className="range"
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label className="len">Length : {length}</label>
        <label> Number</label>
        <input
          type="checkbox"
          defaultChecked={number}
          onChange={() => setNumber((prev) => !prev)}
        />
        <label> Character</label>
        <input
          type="checkbox"
          defaultChecked={character}
          onChange={() => setCharacter((prev) => !prev)}
        />
      </div>
    </div>
  );
}
