type StepDotsProps = {
  total: number;
  current: number;
};

function StepDots({ total, current }: StepDotsProps) {
  return (
    <div className="flex gap-2 justify-center mt-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i === current ? "bg-[#4682B4]" : i < current ? "bg-[#4682B4]/40" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default StepDots;
