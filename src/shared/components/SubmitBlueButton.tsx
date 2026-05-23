interface SubmitBlueButtonProps {
  onClick: () => void;
  text: string;
}

const SubmitBlueButton = ({ onClick, text }: SubmitBlueButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full cursor-pointer rounded-2xl bg-blue-600 py-4 text-center text-lg font-black text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98] active:shadow-md"
    >
      {text}
    </button>
  );
};

export default SubmitBlueButton;
