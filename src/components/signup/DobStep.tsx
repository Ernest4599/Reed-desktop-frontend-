import StepDots from "./StepDots";

type DobStepProps = {
  dob: string;
  gender: "male" | "female";
  onDobChange: (v: string) => void;
  onGenderChange: (v: "male" | "female") => void;
  onNext: () => void;
};

function DobStep({ dob, gender, onDobChange, onGenderChange, onNext }: DobStepProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Date of birth & gender</h1>
      <p className="text-slate-400 text-center text-sm">This helps us create a safer and better experience for you.</p>
      <input
        type="date" value={dob}
        onChange={(e) => onDobChange(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
        required
      />
      <div className="flex gap-2">
        <button
          onClick={() => onGenderChange("male")}
          className={`flex-1 px-4 py-3 rounded-full text-sm font-medium ${gender === "male" ? "bg-[#4682B4] text-white" : "bg-slate-100 text-slate-500"}`}
        >
          Male
        </button>
        <button
          onClick={() => onGenderChange("female")}
          className={`flex-1 px-4 py-3 rounded-full text-sm font-medium ${gender === "female" ? "bg-[#4682B4] text-white" : "bg-slate-100 text-slate-500"}`}
        >
          Female
        </button>
      </div>
      <button
        onClick={() => dob && onNext()}
        disabled={!dob}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        Next
      </button>
      <StepDots total={5} current={3} />
    </>
  );
}

export default DobStep;
