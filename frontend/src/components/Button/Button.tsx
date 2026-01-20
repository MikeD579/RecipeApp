interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  styleName?: string;
}

export const Button = ({ label, onClick, variant = 'primary', styleName }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        `px-4 py-2 rounded-lg font-semibold transition ${styleName || ''} ${variant === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'bg-gray-500 hover:bg-gray-600 text-white'
        }`
      }
    >
      {label}
    </button>
  )
}