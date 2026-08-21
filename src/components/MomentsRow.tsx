type MomentsRowProps = {
  onAddMoment: () => void;
};

export default function MomentsRow({ onAddMoment }: MomentsRowProps) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      <div
        onClick={onAddMoment}
        className="h-40 w-32 flex-shrink-0 rounded-xl border border-dashed border-[#4682B4] bg-slate-50 flex items-center justify-center cursor-pointer"
      >
        + Add Moment
      </div>
    </div>
  );
}
