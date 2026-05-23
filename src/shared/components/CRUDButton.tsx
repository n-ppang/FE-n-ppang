import { twMerge } from 'tailwind-merge';

interface CRUDButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const CRUDButton = ({ onClick, text, className }: CRUDButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95",
        className
      )}
    >
      <span className="text-xl">+</span>
      <span>{text}</span>
    </button>
  );
};

export default CRUDButton;
