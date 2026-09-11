type SuccessProps = {
  firstName: string;
  onStartExploring: () => void;
};

function Success({ firstName, onStartExploring }: SuccessProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">✓</div>
      <h1 className="text-xl font-semibold text-center">Welcome to Reed, {firstName}!</h1>
      <p className="text-slate-400 text-sm text-center">Your account has been created successfully. Get ready to explore, connect and be part of something amazing.</p>
      <button
        onClick={onStartExploring}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium w-full"
      >
        Start Exploring
      </button>
    </div>
  );
}

export default Success;
