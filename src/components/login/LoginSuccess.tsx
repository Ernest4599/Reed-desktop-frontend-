type LoginSuccessProps = {
  firstName: string;
  onContinue: () => void;
};

function LoginSuccess({ firstName, onContinue }: LoginSuccessProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">✓</div>
      <h1 className="text-xl font-semibold text-center">Welcome back, {firstName}!</h1>
      <p className="text-slate-400 text-sm text-center">You've successfully logged in. Get ready to explore, connect and be part of the Reed community.</p>
      <button
        onClick={onContinue}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium w-full"
      >
        Go to Feed
      </button>
    </div>
  );
}

export default LoginSuccess;
