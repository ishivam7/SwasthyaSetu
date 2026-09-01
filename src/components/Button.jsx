function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = ""
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ss-btn ss-btn-${variant} ss-btn-${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;