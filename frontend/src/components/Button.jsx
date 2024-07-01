import PropTypes from "prop-types";

const Button = ({
  onClick,
  children,
  className = "",
  variant = "normal",
  disabled = false,
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition duration-200";

  const variantClasses = {
    normal: "bg-primary text-textSecondary focus:ring-primary",
    remove: "bg-error text-textSecondary focus:ring-error",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${disabled ? disabledClasses : "hover:bg-opacity-80"} 
    ${className}
  `.trim();

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["normal", "remove"]),
  disabled: PropTypes.bool,
};

export default Button;
