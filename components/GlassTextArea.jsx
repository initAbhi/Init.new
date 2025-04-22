const GlassTextarea = ({ placeholder = "Write something..." }) => {
    return (
      <textarea
        className="w-full max-w-md h-40 p-4 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#fff4] focus:border-white/40 transition duration-300 ease-in-out"
        placeholder={placeholder}
      />
    );
  };
  
  export default GlassTextarea;
  