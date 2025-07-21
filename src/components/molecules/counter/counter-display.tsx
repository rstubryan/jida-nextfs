"use client";

import { useAppSelector } from "@/lib/hooks";

export default function CounterDisplay() {
  const { value, history } = useAppSelector((state) => state.counter);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Counter Display</h2>
      <div className="text-2xl font-bold mb-4">Current Value: {value}</div>
      <div>
        <h3 className="text-lg font-bold mb-2">History:</h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No history yet</p>
        ) : (
          <ul className="list-disc pl-5">
            {history.map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
