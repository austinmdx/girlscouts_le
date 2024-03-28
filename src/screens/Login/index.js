import React, { useState, useRef, useMemo } from "react";
import Button from "../../components/base/Button";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { password, login } = useAuth();
  const [arrayValue, setArrayValue] = useState(["", "", "", ""]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentFocusedIndex, setCurrentFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  const onKeyDown = (e) => {
    const keyCode = parseInt(e.key);
    if (
      !(keyCode >= 0 && keyCode <= 9) &&
      e.key !== "Backspace" &&
      !(e.metaKey && e.key === "v")
    ) {
      e.preventDefault();
    }
  };

  const onChange = (e, index) => {
    setArrayValue((preValue) => {
      const newArray = [...preValue];

      if (parseInt(e.target.value)) {
        newArray[index] = parseInt(e.target.value);
      } else {
        newArray[index] = e.target.value;
      }

      return newArray;
    });
  };

  const onKeyUp = (e, index) => {
    if (e.key === "Backspace") {
      if (index === 0) {
        setCurrentFocusedIndex(0);
      } else {
        setCurrentFocusedIndex(index - 1);
        if (inputRefs && inputRefs.current && index === currentFocusedIndex) {
          inputRefs.current[index - 1].focus();
        }
      }
    } else {
      if (parseInt(e.key) && index < arrayValue.length - 1) {
        setCurrentFocusedIndex(index + 1);
        if (inputRefs && inputRefs.current && index === currentFocusedIndex) {
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  const onFocus = (e, index) => {
    setCurrentFocusedIndex(index);
    // e.target.focus();
  };

  const isValidPassword = useMemo(() => {
    const password = arrayValue.join("");
    return password.length === 4;
  }, [arrayValue]);

  const handleLogin = () => {
    const credentials = window.localStorage.getItem('credentials')
    const password = arrayValue.join("");
    if (credentials) {
      const credentialArr = JSON.parse(credentials);
      const matchingPassword = credentialArr.find(
        (item) => item.password === password,
      );
      if (matchingPassword) {
        login(password);
        return;
      }
    }
    setShowErrorMessage(true);
  };

  if (password != null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-10 pt-0">
      <h3>Welcome to Girl Scouts,</h3>
      <h2 className="text-4xl mt-5 mb-10 font-bold">Log In!</h2>
      <div>
        {arrayValue.map((value, index) => (
          <input
            key={`index-${index}`}
            ref={(el) => el && (inputRefs.current[index] = el)}
            inputMode="numeric"
            maxLength={1}
            type="password"
            value={String(value)}
            onChange={(e) => onChange(e, index)}
            onKeyUp={(e) => onKeyUp(e, index)}
            onKeyDown={(e) => onKeyDown(e)}
            onFocus={(e) => onFocus(e, index)}
            className="w-16 h-16 mr-5 text-1xl text-center p-1 border border-gray-600"
          />
        ))}
      </div>
      {showErrorMessage && (
        <div className="text-xl text-red-600 mt-5">
          Invalid password. Please try again!
        </div>
      )}
      <Button
        title="Login"
        className="w-52 mt-16"
        disabled={!isValidPassword}
        onClick={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
