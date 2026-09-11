import StepDots from "./StepDots";

type AccountStepProps = {
  firstName: string;
  surname: string;
  onFirstNameChange: (v: string) => void;
  onSurnameChange: (v: string) => void;
  onNext: () => void;
};

function AccountStep({ firstName, surname, onFirstNameChange, onSurnameChange, onNext }: AccountStepProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center">Create your account</h1>
      <p className="text-slate-400 text-center text-sm">Let's get to know you.</p>
      <input
        type="text" placeholder="First name" value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
        required
      />
      <input
        type="text" placeholder="Surname" value={surname}
        onChange={(e) => onSurnameChange(e.target.value)}
        className="border border-slate-200 rounded-full px-4 py-3 outline-none focus:border-[#4682B4]"
        required
      />
      <button
        onClick={() => firstName && surname && onNext()}
        disabled={!firstName || !surname}
        className="bg-[#4682B4] text-white rounded-full px-4 py-3 font-medium disabled:opacity-50"
      >
        Next
      </button>
      <StepDots total={5} current={0} />
    </>
  );
}

export default AccountStep;
