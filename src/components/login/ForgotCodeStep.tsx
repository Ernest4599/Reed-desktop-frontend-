type ForgotCodeStepProps = {
  contact: string;
  code: string;
  error: string;
  loading: boolean;
  onCodeChange: (v: string) => void;
  onVerify: () => void;
  onBack: () => void;
};

function ForgotCodeStep({ contact, code, error, loading, onCodeChange, onVerify, onBack }: ForgotCodeStepProps) {
  return (
    <>
      <button onClick={onBack} className="text-slate-400 text-sm text-left" type="button">← Back</button>
      <h1 className="text-2xl font-semibold text-center">Verify Your Email / Phone</h1>
      <p className="text-slate-400 text-center text-sm">We've sent a 6-digit code to {contact}. Enter it below to continue.</p>
      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
      <input
        type="text" inputMode="numeric" maxLength={6}
        placeholder="6-digit code"
        value={code}
        onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ""))}
        className="border border-slate-200 rounded-full px-4 py-3 text-center tracking-[0.5em] outline-none focus:border-[#4682B4]"
      />
      <button
        onClick={onVerify}
        disabled={code.length !== 6 || loading}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>
    </>
  );
}

export default ForgotCodeStep;
