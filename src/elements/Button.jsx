const Button = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-slate-900 hover:bg-gray-500 rounded px-3 py-2 text-white"
    >
      {children}
    </button>
  );
};

export default Button;
