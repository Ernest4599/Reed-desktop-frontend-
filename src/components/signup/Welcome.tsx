import { Link } from "react-router-dom";
import GoogleButton from "../GoogleButton";

type WelcomeProps = {
  onNext: () => void;
  onGoogleSuccess: (token: string, firstName: string) => void;
  onGoogleError: (message: string) => void;
  googleError: string;
};

function Welcome({ onNext, onGoogleSuccess, onGoogleError, googleError }: WelcomeProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Your world.<br />Your people.<br />Your feed.</h1>
      <p className="text-slate-400 text-center text-sm">Discover what matters. Build real connections. Be part of something bigger.</p>

      {googleError && <div className="text-sm text-red-500 text-center">{googleError}</div>}

      <GoogleButton onSuccess={onGoogleSuccess} onError={onGoogleError} />

      <div className="flex items-center gap-2 text-slate-400 text-xs">
        <div className="flex-1 h-px bg-slate-200" />
        OR
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <button
        onClick={onNext}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium"
      >
        Get Started
      </button>
      <p className="text-sm text-slate-400 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[#4682B4] font-medium">Log in</Link>
      </p>
    </>
  );
}

export default Welcome;
