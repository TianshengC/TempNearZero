import PropTypes from "prop-types";

const Button = ({ onClick, children, className = "", variant = "normal" }) => {
  const baseClasses =
    "px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2  transition duration-200";

  const variantClasses = {
    normal: "bg-primary text-textSecondary focus:ring-primary",
    remove: "bg-error text-textSecondary focus:ring-error",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["add", "remove"]),
};

export default Button;
