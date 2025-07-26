const Button = ({ text, fullWidth, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`mt-4 py-2 px-4 rounded-lg text-white bg-[#693EE0] hover:from-purple-600 hover:to-indigo-600
          hover:scale-105 transition border border-gray-300 ${
          fullWidth ? "w-full" : ""
        }`}
        
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  