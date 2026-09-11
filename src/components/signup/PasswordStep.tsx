import StepDots from "./StepDots";

type PasswordStepProps = {
  password: string;
  error: string;
  onPasswordChange: (v: string) => void;
  onSubmit: () => void;
};

function PasswordStep({ password, error, onPasswordChange, onSubmit }: PasswordStepProps) {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const valid = Object.values(checks).every(Boolean);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Create a strong password</h1>
      <p className="text-slate-400 text-center text-sm">Your password keeps your account safe. Make it unique and secure.</p>
      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
      <input
        type="password" placeholder="Enter password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
      />
      <ul className="text-sm flex flex-col gap-1 px-2">
        <li className={checks.length ? "text-green-600" : "text-slate-400"}>✓ At least 8 characters</li>
        <li className={checks.upper ? "text-green-600" : "text-slate-400"}>✓ One uppercase letter</li>
        <li className={checks.lower ? "text-green-600" : "text-slate-400"}>✓ One lowercase letter</li>
        <li className={checks.number ? "text-green-600" : "text-slate-400"}>✓ One number</li>
        <li className={checks.special ? "text-green-600" : "text-slate-400"}>✓ One special character</li>
      </ul>
      <button
        onClick={onSubmit}
        disabled={!valid}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        Next
      </button>
      <StepDots total={5} current={4} />
    </>
  );
}

export default PasswordStep;
