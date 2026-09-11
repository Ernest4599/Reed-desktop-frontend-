import { Link } from "react-router-dom";

type WelcomeProps = {
  onNext: () => void;
};

function Welcome({ onNext }: WelcomeProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Your world.<br />Your people.<br />Your feed.</h1>
      <p className="text-slate-400 text-center text-sm">Discover what matters. Build real connections. Be part of something bigger.</p>
      <button
        onClick={onNext}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium mt-2"
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
