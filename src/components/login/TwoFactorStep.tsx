type TwoFactorStepProps = {
  code: string;
  onCodeChange: (v: string) => void;
  onVerify: () => void;
  onSkip: () => void;
  onBack: () => void;
};

function TwoFactorStep({ code, onCodeChange, onVerify, onSkip, onBack }: TwoFactorStepProps) {
  return (
    <>
      <button onClick={onBack} className="text-slate-400 text-sm text-left" type="button">← Back</button>
      <h1 className="text-2xl font-semibold text-center">Two-Factor Authentication</h1>
      <p className="text-slate-400 text-center text-sm">For extra security, enter the 6-digit code from your authenticator app or SMS.</p>
      <input
        type="text" inputMode="numeric" maxLength={6}
        placeholder="6-digit code"
        value={code}
        onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ""))}
        className="border border-slate-200 rounded-full px-4 py-3 text-center tracking-[0.5em] outline-none focus:border-[#4682B4]"
      />
      <button
        onClick={() => code.length === 6 && onVerify()}
        disabled={code.length !== 6}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        Verify
      </button>
      <button onClick={onSkip} className="text-slate-400 text-sm" type="button">
        Skip for now
      </button>
    </>
  );
}

export default TwoFactorStep;
