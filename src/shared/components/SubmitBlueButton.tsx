interface SubmitBlueButtonProps {
  onClick: () => void;
  text: string;
}

const SubmitBlueButton = ({ onClick, text }: SubmitBlueButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="m-2 w-full rounded bg-blue-500 p-2 text-white"
    >
      {text}
    </button>
  );
};

export default SubmitBlueButton;
