const InfoCard = ({ icon, title, desc }) => {
  return (
    <div className="group relative p-8 rounded-xl border border-white/5 bg-(--bg-surface)/50 hover:bg-(--bg-surface) transition-all duration-500 hover:-translate-y-2 hover:border-(--accent-yellow)/30">
      
      {/* Icon Wrapper with Glow Effect */}
      <div className="mb-6 inline-flex items-center justify-center p-3 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:ring-(--accent-yellow)/50 transition-all duration-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-(--accent-yellow) transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-(--muted-gray) leading-relaxed">
        {desc}
      </p>

      {/* Industrial Corner Accent (Visual Flair) */}
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-2 h-2 bg-(--accent-yellow) rounded-full shadow-[0_0_10px_var(--accent-yellow)]"></div>
      </div>
    </div>
  );
};

export default InfoCard;