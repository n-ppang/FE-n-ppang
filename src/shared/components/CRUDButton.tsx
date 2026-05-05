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
      className={twMerge(`cursor-pointer rounded-2xl bg-gray-300 p-2 ${className}`)}
    >
      {text}
    </button>
  );
};

export default CRUDButton;
