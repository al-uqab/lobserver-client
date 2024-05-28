"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  distance: number;
  time: string;
  runningType: string,
  treadmill: boolean;
  sex: string;
  age: number;
  weight: number;
  speed: number;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    distance: 0,
    time: '',
    runningType: 'outdoor',
    treadmill: false,
    sex: 'male',
    age: 0,
    weight: 0,
    speed: 0
  });

  const [result, setResult] = useState<number | string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : (name === 'time' ? value : parseFloat(value))
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Validation
    const validationErrors: string[] = [];
    if (formData.distance <= 0 || isNaN(formData.distance)) {
      validationErrors.push("distance must be a positive number");
    }
    if (formData.age <= 0 || formData.age > 120 || isNaN(formData.age)) {
      validationErrors.push("age must be a number between 1 and 120");
    }
    if (formData.weight <= 0 || isNaN(formData.weight)) {
      validationErrors.push("weight must be a positive number");
    }
    if (formData.speed <= 0 || isNaN(formData.speed)) {
      validationErrors.push("speed must be a positive number");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/runs`, formData);
      setResult(response.data.caloriesBurned);
    } catch (error) {
      console.error('Error calculating calories:', error);
      setResult('Error calculating calories');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-800 to-blue-900 text-white"> {/* Gradient blue background */}
      <div className="max-w-md w-full rounded-lg shadow-md bg-white overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-4">Fitness Run Calculator</h2> {/* Dark blue heading */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="grid grid-cols-1 gap-4">
              <legend className="sr-only">Form Fields</legend>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="distance" className="text-sm font-medium text-gray-700">Distance (km)</label>
                <input
                    type="number"
                    id="distance"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                    placeholder="Enter distance..."
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-none"
                />
              </div>
              {/* Add tabs for running type */}
              <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => setFormData({...formData, runningType: 'outdoor'})}
                    className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${formData.runningType === 'outdoor' ? 'bg-yellow-600 text-white' : 'text-gray-700'}`}
                >
                  Outdoor
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({...formData, runningType: 'treadmill'})}
                    className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${formData.runningType === 'treadmill' ? 'bg-yellow-600 text-white' : 'text-gray-700'}`}
                >
                  Treadmill
                </button>
              </div>
              {/* End of tabs */}
              {/* Other form elements */}
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="sex" className="text-sm font-medium text-gray-700">Sex</label>
                <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="input-field rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-semibold text-gray-800 mb-1">Time (hh:mm:ss)</label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    placeholder="Enter time..."
                    className="input-field rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="age" className="text-sm font-medium text-gray-700">Age</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="Enter your age..."
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="Enter your weight..."
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label htmlFor="speed" className="text-sm font-medium text-gray-700">Speed (km/h)</label>
                <input
                    type="number"
                    id="speed"
                    name="speed"
                    value={formData.speed}
                    onChange={handleChange}
                    required
                    placeholder="Enter your speed..."
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none input-field rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-none"
                />
              </div>
            </fieldset>
            <button type="submit"
                    className="w-full py-3 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-none">
              Calculate
            </button>
          </form>
          {result !== null && (
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-gray-900">Calories Burned: {result}</p>
              <p className="text-sm text-gray-500">**Disclaimer:** This is an estimate and may not reflect your actual calorie burn.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
