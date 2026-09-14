import { Link } from "react-router-dom";
import GoogleButton from "../GoogleButton";

type CredentialsStepProps = {
  contact: string;
  password: string;
  error: string;
  loading: boolean;
  onContactChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onGoogleSuccess: (token: string, firstName: string) => void;
  onGoogleError: (message: string) => void;
};

function CredentialsStep({
  contact, password, error, loading,
  onContactChange, onPasswordChange, onSubmit, onForgotPassword,
  onGoogleSuccess, onGoogleError,
}: CredentialsStepProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Log In</h1>
      <p className="text-slate-400 text-center text-sm">Enter your phone number or email and password to continue.</p>

      {error && (
        <div className="text-sm text-red-500 text-center">{error}</div>
      )}

      <input
        type="text"
        placeholder="Phone number or email"
        value={contact}
        onChange={(e) => onContactChange(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
        required
      />
      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4] w-full"
          required
        />
        <button
          onClick={onForgotPassword}
          className="text-[#4682B4] text-sm text-right"
          type="button"
        >
          Forgot password?
        </button>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !contact || !password}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <div className="flex-1 h-px bg-slate-200" />
        OR
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <GoogleButton onSuccess={onGoogleSuccess} onError={onGoogleError} />

      <p className="text-sm text-slate-400 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#4682B4] font-medium">Sign Up</Link>
      </p>
    </>
  );
}

export default CredentialsStep;
