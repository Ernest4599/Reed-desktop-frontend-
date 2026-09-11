import StepDots from "./StepDots";

type VerifyStepProps = {
  contact: string;
  code: string;
  error: string;
  loading: boolean;
  onCodeChange: (v: string) => void;
  onNext: () => void;
};

function VerifyStep({ contact, code, error, loading, onCodeChange, onNext }: VerifyStepProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Enter verification code</h1>
      <p className="text-slate-400 text-center text-sm">We've sent a 6-digit code to {contact}.</p>
      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
      <input
        type="text" inputMode="numeric" maxLength={6}
        placeholder="6-digit code"
        value={code}
        onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ""))}
        className="border border-slate-200 rounded-full px-4 py-3 text-center tracking-[0.5em] outline-none focus:border-[#4682B4]"
      />
      <button
        onClick={onNext}
        disabled={code.length !== 6 || loading}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Next"}
      </button>
      <StepDots total={5} current={2} />
    </>
  );
}

export default VerifyStep;
