import { ChangeEvent, useEffect, useState } from "react";
import { GoCopy } from "react-icons/go";
//
import { EvaluatePasswordStrength, GeneratePassword } from "../../utilities";
import { PASSWORD_OPTIONS } from "./constants";

import { ToastContainer, toast } from "react-toastify";
import "./Home.scss";

export const Home = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [checkedState, setCheckedState] = useState(
    new Array(PASSWORD_OPTIONS.length).fill(false)
  );
  const [strengthScore, setStrengthScore] = useState(0);

  const onChangePasswordLength = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(event.target.value));
  };

  const onCheckedChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    PASSWORD_OPTIONS[position].isChecked = updatedCheckedState[position];
    setCheckedState(updatedCheckedState);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast(password ? "Password copied!" : "Password not generated yet!");
  };

  const handleGeneratePassword = () => {
    const [isUseUpperCase, isUseNumbers, isUseSymbols] = PASSWORD_OPTIONS.map(
      (option) => option.isChecked
    );

    setPassword(
      GeneratePassword(
        passwordLength,
        isUseNumbers,
        isUseSymbols,
        isUseUpperCase
      )
    );
  };

  useEffect(() => {
    const [isUseUpperCase, isUseNumbers, isUseSymbols] = PASSWORD_OPTIONS.map(
      (option) => option.isChecked
    );

    setStrengthScore(
      EvaluatePasswordStrength(
        passwordLength,
        isUseNumbers,
        isUseSymbols,
        isUseUpperCase
      )
    );
  }, [passwordLength, checkedState]);

  const getProgressBarClass = () => {
    switch (strengthScore) {
      case 0:
      case 1:
      case 2:
        return "progress progress-error";
      case 3:
      case 4:
        return "progress progress-primary";
      default:
        return "progress progress-success";
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-black flex flex-col items-center justify-center gap-3 text-white">
        <div className="relative w-full max-w-lg ">
          <textarea
            className="textarea w-full h-8 bg-gray-800 cursor-default resize-none text-base leading-[30px] tracking-wider"
            placeholder="Click button below to generate your strong password"
            value={password ? password : ""}
            readOnly
          ></textarea>
          <div
            className="tooltip absolute right-[8px] top-[15px] cursor-pointer"
            data-tip="Copy"
          >
            <GoCopy className="" size={20} onClick={handleCopyPassword} />
          </div>
        </div>

        <div className="w-full max-w-lg rounded-lg bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <p>Password Length</p>
            <p>{passwordLength}</p>
          </div>

          <div
            className="tooltip tooltip-bottom w-full mt-3"
            data-tip="Recommend 12 characters long or more"
          >
            <input
              className="range range-xs"
              type="range"
              min="6"
              max="20"
              value={passwordLength}
              onChange={onChangePasswordLength}
            />
          </div>

          <div className="flex flex-col gap-4 mt-5">
            {PASSWORD_OPTIONS.map((option, index) => {
              return (
                <div className="flex items-center gap-2" key={index}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success checkbox-sm"
                    checked={option.isChecked}
                    onChange={() => onCheckedChange(index)}
                  />
                  <p className="label-text text-white text-base">
                    {option.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="w-full p-4 bg-black text-white rounded-lg mt-4 flex flex-col gap-4">
            Password Strength
            <progress
              className={getProgressBarClass()}
              value={strengthScore}
              max={5}
            />
          </div>

          <button
            className="btn btn-success w-full min-h-10 h-10 mt-6 text-white"
            onClick={handleGeneratePassword}
          >
            GENERATE PASSWORD
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={1500} theme="light" />
    </>
  );
};
