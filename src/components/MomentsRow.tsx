import { useState } from "react";

export default function MomentsRow() {
  const [moments, setMoments] = useState<number[]>([]);

  function handleAddMoment() {
    setMoments([...moments, moments.length + 1]);
  }

  return (
    <div className="flex gap-4 overflow-x-auto">
      <div
        onClick={handleAddMoment}
        className="h-40 w-32 flex-shrink-0 rounded-xl border border-dashed border-[#4682B4] bg-slate-50 flex items-center justify-center cursor-pointer"
      >
        + Add Moment
      </div>

      {moments.map((moment) => (
        <div
          key={moment}
          className="h-40 w-32 flex-shrink-0 rounded-xl border border-[#4682B4] bg-slate-50"
        />
      ))}
    </div>
  );
}
