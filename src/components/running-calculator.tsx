"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { IBM_Plex_Serif } from "next/font/google";
import { calculateCalories } from "@/utils/calculation";

import Container from "@/app/_components/container";

const ibmSerif = IBM_Plex_Serif({ weight: ["400", "700"], subsets: ["latin"] });

interface FormData {
  distance: number;
  time: number;
  runningType: string;
  treadmill: boolean;
  sex: string;
  age: number;
  weight: number;
  speed: number;
}

export default function RunningCalculator() {
  const [formData, setFormData] = useState<FormData>({
    distance: 0,
    time: 0,
    runningType: "outdoor",
    treadmill: false,
    sex: "male",
    age: 0,
    weight: 0,
    speed: 0,
  });

  const [result, setResult] = useState<number | string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const updatedValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : parseFloat(value);

    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: updatedValue };
      if (
        (name === "distance" || name === "time") &&
        updatedFormData.time > 0
      ) {
        updatedFormData.speed =
          (updatedFormData.distance / updatedFormData.time) * 60; // convert time from minutes to hours
      }
      return updatedFormData;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setResult(null); // Reset the result before making the API call

    // Validation
    const validationErrors: string[] = [];
    if (formData.distance <= 0 || isNaN(formData.distance)) {
      validationErrors.push("Distance must be a positive number");
    }
    if (formData.age <= 0 || formData.age > 120 || isNaN(formData.age)) {
      validationErrors.push("Age must be a number between 1 and 120");
    }
    if (formData.weight <= 0 || isNaN(formData.weight)) {
      validationErrors.push("Weight must be a positive number");
    }
    if (formData.speed <= 0 || isNaN(formData.speed)) {
      validationErrors.push("Speed must be a positive number");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const calculatedCalories = calculateCalories(formData);
      setResult(calculatedCalories);
    } catch (error) {
      console.error("Error calculating calories:", error);
      setResult("Error calculating calories");
    }
  };

  return (
    <section className="bg-white">
      <Container backgroundColor="teal-400">
        <section className="flex-col gap-8 md:flex-row flex items-center md:justify-between mb-16 md:mb-12">
          <div className="flex items-center justify-center text-slate-800">
            <div className="max-w-lg w-full rounded-lg overflow-hidden">
              <div className="py-8">
                <h2
                  className={`text-5xl font-bold tracking-tighter leading-tight text-left text-green-950 mb-4 ${ibmSerif.className}`}
                >
                  Calculate Your{" "}
                  <span className="underline underline-offset-auto decoration-wavy">
                    Running
                  </span>{" "}
                  Calories Burned
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <fieldset className="grid grid-cols-1 gap-4">
                    <legend className="sr-only">Form Fields</legend>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, runningType: "outdoor" })
                        }
                        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${formData.runningType === "outdoor" ? "bg-slate-800 text-neutral-50" : "text-slate-800 border border-teal-400"}`}
                      >
                        Outdoor
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, runningType: "treadmill" })
                        }
                        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${formData.runningType === "treadmill" ? "bg-slate-800 text-neutral-50" : "text-slate-800 border border-teal-400"}`}
                      >
                        Treadmill
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        htmlFor="distance"
                        className="text-sm font-medium text-slate-800"
                      >
                        Distance (km)
                      </label>
                      <input
                        type="number"
                        id="distance"
                        name="distance"
                        value={formData.distance}
                        onChange={handleChange}
                        required
                        placeholder="Enter distance..."
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md py-2 px-3 bg-green-50 text-slate-800 focus:outline-none focus:ring-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        htmlFor="sex"
                        className="text-sm font-medium text-slate-800"
                      >
                        Sex
                      </label>
                      <select
                        id="sex"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        className="input-field rounded-md py-2 px-3 bg-green-50 text-slate-800 focus:outline-none focus:ring-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="time"
                        className="text-sm font-semibold text-slate-800 mb-1"
                      >
                        Time (minutes)
                      </label>
                      <input
                        type="number"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        placeholder="Enter time..."
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md py-2 px-3 bg-green-50 text-slate-800 focus:outline-none focus:ring-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        htmlFor="age"
                        className="text-sm font-medium text-slate-800"
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        placeholder="Enter your age..."
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md py-2 px-3 bg-green-50 text-slate-800 focus:outline-none focus:ring-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        htmlFor="weight"
                        className="text-sm font-medium text-slate-800"
                      >
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                        placeholder="Enter your weight..."
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md py-2 px-3 bg-green-50 text-slate-800 focus:outline-none focus:ring-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label
                        htmlFor="speed"
                        className="text-sm font-medium text-slate-800"
                      >
                        Speed (km/h)
                      </label>
                      <input
                        type="number"
                        id="speed"
                        name="speed"
                        value={formData.speed}
                        onChange={handleChange}
                        required
                        placeholder="Enter your speed..."
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md border-none py-2 px-3 bg-green-50 text-slate-800 focus:outline-none focus:ring-none"
                      />
                    </div>
                  </fieldset>
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-neutral-50 font-semibold rounded-md shadow-sm transition duration-300"
                  >
                    Calculate
                  </button>
                </form>
                {result !== null && (
                  <div className="mt-6 text-center">
                    <p className="text-lg font-semibold text-neutral-50">
                      Calories Burned: {result}
                    </p>
                    <p className="text-xs text-teal-300">
                      <strong>Disclaimer:</strong> This is an estimate and may
                      not reflect your actual calorie burn.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:w-1/3">
            <p className="text-s text-left text-teal-950 mb-4">
              Use our running calculator to estimate the calories burned during
              your runs. Whether you&apos;re running outdoors or on a treadmill,
              input your details like distance, time, age, weight, and speed to
              get an accurate estimation of your calorie burn. This tool is
              perfect for runners of all levels who want to keep track of their
              fitness and health progress.
            </p>
          </div>
        </section>
      </Container>
    </section>
  );
}
