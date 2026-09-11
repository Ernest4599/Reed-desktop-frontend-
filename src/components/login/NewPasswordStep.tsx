import { useState } from "react";

type NewPasswordStepProps = {
  error: string;
  loading: boolean;
  onReset: (password: string) => void;
  onBack: () => void;
};

function NewPasswordStep({ error, loading, onReset, onBack }: NewPasswordStepProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const valid = Object.values(checks).every(Boolean) && password === confirm && confirm.length > 0;

  return (
    <>
      <button onClick={onBack} className="text-slate-400 text-sm text-left" type="button">← Back</button>
      <h1 className="text-2xl font-semibold text-center">Create New Password</h1>
      <p className="text-slate-400 text-center text-sm">Your new password must be strong and secure.</p>

      {error && <div className="text-sm text-red-500 text-center">{error}</div>}

      <input
        type="password" placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
      />
      <ul className="text-sm flex flex-col gap-1 px-2">
        <li className={checks.length ? "text-green-600" : "text-slate-400"}>✓ At least 8 characters</li>
        <li className={checks.upper ? "text-green-600" : "text-slate-400"}>✓ One uppercase letter</li>
        <li className={checks.lower ? "text-green-600" : "text-slate-400"}>✓ One lowercase letter</li>
        <li className={checks.number ? "text-green-600" : "text-slate-400"}>✓ One number</li>
        <li className={checks.special ? "text-green-600" : "text-slate-400"}>✓ One special character</li>
      </ul>

      <input
        type="password" placeholder="Re-enter your password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
      />

      <button
        onClick={() => valid && onReset(password)}
        disabled={!valid || loading}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </>
  );
}

export default NewPasswordStep;
