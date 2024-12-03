export const PrimaryButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-primary-gradient px-6 py-2 text-sm font-medium text-white ${className}`}
    >
      {children}
    </button>
  );
};
