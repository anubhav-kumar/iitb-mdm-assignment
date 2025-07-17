interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  fullHeight?: boolean;
}

const Button = (props: ButtonProps) => {
  const { label, onClick, variant = "primary", fullHeight = false } = props;
  const baseStyles =
    "px-6 py-3 rounded-xl shadow transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${fullHeight ? "h-32" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
