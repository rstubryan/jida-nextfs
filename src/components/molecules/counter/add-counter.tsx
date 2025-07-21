"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "@/lib/features/counter/counterSlice";

export default function AddCounter() {
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState(1);

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4">Counter Controls</h2>
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          className="px-2 py-1 border rounded w-20"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
