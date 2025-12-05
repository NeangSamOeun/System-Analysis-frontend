const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="w-16 h-16 rounded-full border-4 border-green-400/30 animate-ping absolute" />

        {/* Main spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-lg" />
      </div>
    </div>
  );
};

export default Loader;
