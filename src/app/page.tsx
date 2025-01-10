"use client";

import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {


  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Slider States
  const [sliderValue, setSliderValue] = useState(50);
  const [stepValue, setStepValue] = useState(0.01);
  const [dualSliderValue1, setDualSliderValue1] = useState(25);
  const [dualSliderValue2, setDualSliderValue2] = useState(75);

  // Dropdown States
  const [singleSelectValue, setSingleSelectValue] = useState("option1");

  // Multiple Select (MCQ/ MSQ) States
  const [multipleSelectValues, setMultipleSelectValues] = useState<string[]>([]);

  // Search Bar States
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchActivated, setIsSearchActivated] = useState(false);



  const handleSearch = () => {
    if (!isLoggedIn) {
      router.push("/login");

    } else {
      setIsSearchActivated(true);
    }
  };

  // Handle for Sliders
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleStepSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepValue(Number(e.target.value));
  };

  const handleDualSliderChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue1 = Number(e.target.value);
    if (newValue1 < dualSliderValue2) {
      setDualSliderValue1(newValue1);
    } else {
      setDualSliderValue1(dualSliderValue2 - 1);
    }
  };

  const handleDualSliderChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = Number(e.target.value);
    if (newValue2 > dualSliderValue1) {
      setDualSliderValue2(newValue2);
    } else {
      setDualSliderValue2(dualSliderValue1 + 1);
    }
  };

  // Handle for Step Size Input (Keyboard Input)
  const handleStepValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStepValue = parseFloat(e.target.value);
    if (newStepValue >= 0.001 && newStepValue <= 10) {
      setStepValue(newStepValue);
    }
  };

  // Handle for Single Select Dropdown
  const handleSingleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSingleSelectValue(e.target.value);
  };

  // Handle for Multiple Select (MCQ/ MSQ)
  const handleMultipleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMultipleSelectValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((item) => item !== value)
        : [...prevValues, value]
    );
  };

  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-black text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* Main Content */}
      <div className={`flex flex-col items-center w-full ${isSearchActivated ? "mt-12" : "justify-center min-h-screen"} transition-all duration-700`}>
        {/* Header Section */}
        {!isSearchActivated && (
          <div className="w-full max-w-lg mb-8">
            <h1 className="text-4xl font-bold mb-2 text-left">SEALS</h1>
            <p className="text-sm text-zinc-400 text-left">
              Discover insights like never before! Search for videos, unlock detailed analyses, and explore smarter ways to understand your content.
            </p>
          </div>
        )}

        {/* Search Bar with "SEALS" Text in Black Background */}
        <div className={`flex items-center w-full ${isSearchActivated ? "max-w-4xl" : "max-w-xl"} border border-black rounded shadow-md bg-black px-6 py-3 transition-all duration-500`}>
          {isSearchActivated && (
            <h1 className="text-4xl font-bold text-white mr-4">SEALS</h1>
          )}
          <input
            type="text"
            className={`flex-grow px-4 py-3 bg-zinc-800 text-white placeholder-zinc-400 outline-none transition-all duration-300 ${isSearchFocused ? "border-2 border-white" : ""}`}
            placeholder="Type to search..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="ml-2 px-4 py-3 text-black bg-white rounded hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Range Slider Section */}
      <div className="mt-12 w-full max-w-lg text-center">
        <label htmlFor="rangeSlider" className="block text-lg font-semibold text-zinc-400 mb-2">Adjust Value</label>
        <input
          id="rangeSlider"
          type="range"
          min="0"
          max="100"
          step={stepValue}
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
        />
        <p className="mt-4 text-white text-lg">
          Selected Value: <span className="font-bold">{sliderValue.toFixed(1)}</span>
        </p>
      </div>

      {/* Step Size Input Field */}
      <div className="mt-8 w-full max-w-lg">
        <label htmlFor="stepSize" className="block text-lg font-semibold text-zinc-400 mb-2">Step Size</label>
        <input
          type="number"
          id="stepSize"
          value={stepValue}
          onChange={handleStepValueChange}
          min="0.001"
          max="10"
          step="0.01"
          className="w-full h-10 bg-gray-700 text-white rounded-lg px-4"
        />
        <p className="mt-4 text-white text-lg">
          Step Value: <span className="font-bold">{stepValue}</span>
        </p>
      </div>

      

      {/* Dual Range Slider */}
      <div className="mt-12 w-full max-w-lg text-center">
        <label htmlFor="dualRange" className="block text-lg font-semibold text-zinc-400 mb-2">Select Range</label>
        <div className="flex justify-between mb-2">
          <span>{dualSliderValue1}</span>
          <span>{dualSliderValue2}</span>
        </div>
        <input
          type="range"
          id="dualRange1"
          min="0"
          max="100"
          value={dualSliderValue1}
          onChange={handleDualSliderChange1}
          className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer"
        />
        <input
          type="range"
          id="dualRange2"
          min="0"
          max="100"
          value={dualSliderValue2}
          onChange={handleDualSliderChange2}
          className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer mt-4"
        />
        <div className="text-center mt-2 text-xl">
          Range: {dualSliderValue1} - {dualSliderValue2}
        </div>
      </div>

      {/* Single Select Dropdown */}
      <div className="mt-12 w-full max-w-lg text-center">
        <label htmlFor="singleSelect" className="block text-lg font-semibold text-zinc-400 mb-2">Select Single Option</label>
        <select
          id="singleSelect"
          value={singleSelectValue}
          onChange={handleSingleSelectChange}
          className="w-full h-10 bg-gray-700 text-white rounded-lg px-4"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      {/* Multiple Select (MCQ / MSQ) */}
      <div className="mt-12 w-full max-w-lg text-center">
        <label className="block text-lg font-semibold text-zinc-400 mb-2">Select Multiple Options</label>
        <div>
          <label className="block text-lg">
            <input
              type="checkbox"
              value="option1"
              checked={multipleSelectValues.includes("option1")}
              onChange={handleMultipleSelectChange}
            />
            Option 1
          </label>
          <label className="block text-lg">
            <input
              type="checkbox"
              value="option2"
              checked={multipleSelectValues.includes("option2")}
              onChange={handleMultipleSelectChange}
            />
            Option 2
          </label>
          <label className="block text-lg">
            <input
              type="checkbox"
              value="option3"
              checked={multipleSelectValues.includes("option3")}
              onChange={handleMultipleSelectChange}
            />
            Option 3
          </label>
        </div>
      </div>
    </div>
  );
}
