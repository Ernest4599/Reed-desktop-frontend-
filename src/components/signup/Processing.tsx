function Processing() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="h-10 w-10 border-4 border-[#4682B4] border-t-transparent rounded-full animate-spin" />
      <h1 className="text-xl font-semibold">Creating your account...</h1>
      <p className="text-slate-400 text-sm text-center">This will only take a moment.<br />Please don't close this window.</p>
    </div>
  );
}

export default Processing;
