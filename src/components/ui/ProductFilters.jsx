// Icons
import { X } from "lucide-react";

const ProductFilters = ({
  showFilters,
  setShowFilters,
  activeFilters,
  filterOptions,
  handleFilterChange,
  handlePowerRangeChange,
  clearAllFilters,
}) => {
  if (!showFilters) return null;

  return (
    <div className="bg-[#0C2430] border border-white/10 rounded-xl p-6 mb-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
        <h3 className="text-white text-lg font-heading font-bold uppercase tracking-wide">
          Advanced Specs Configuration
        </h3>
        <div className="flex gap-4">
          <button
            onClick={clearAllFilters}
            className="cursor-pointer text-(--muted-gray) hover:text-(--accent-yellow) text-xs uppercase font-bold tracking-wide flex items-center gap-1 transition-colors"
          >
            <X size={14} /> Clear All
          </button>
          {/* Optional: Close Button */}
          <button
            onClick={() => setShowFilters(false)}
            className="text-(--muted-gray) cursor-pointer hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Connection Mode */}
        <div>
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Connection Mode
          </label>
          <div className="space-y-2">
            {filterOptions.connectionModes.map((mode) => (
              <label
                key={mode}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.connectionMode.includes(mode)}
                  onChange={() => handleFilterChange("connectionMode", mode)}
                  className="mr-3 appearance-none size-4 border border-white/20 rounded-sm checked:bg-(--accent-yellow) checked:border-(--accent-yellow) transition-all cursor-pointer relative"
                />
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  {mode}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Aspiration */}
        <div>
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Aspiration
          </label>
          <div className="space-y-2">
            {filterOptions.aspirations.map((asp) => (
              <label
                key={asp}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.aspiration.includes(asp)}
                  onChange={() => handleFilterChange("aspiration", asp)}
                  className="mr-3 appearance-none size-4 border border-white/20 rounded-sm checked:bg-(--accent-yellow) checked:border-(--accent-yellow) transition-all cursor-pointer relative"
                />
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  {asp}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cylinders */}
        <div>
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Cylinders
          </label>
          <div className="space-y-2">
            {filterOptions.cylinders.map((cyl) => (
              <label
                key={cyl}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.cylinders.includes(cyl)}
                  onChange={() => handleFilterChange("cylinders", cyl)}
                  className="mr-3 appearance-none size-4 border border-white/20 rounded-sm checked:bg-(--accent-yellow) checked:border-(--accent-yellow) transition-all cursor-pointer relative"
                />
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  {cyl}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Control System */}
        <div>
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Control System
          </label>
          <div className="space-y-2">
            {filterOptions.controlSystems.map((sys) => (
              <label
                key={sys}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.controlSystem.includes(sys)}
                  onChange={() => handleFilterChange("controlSystem", sys)}
                  className="mr-3 appearance-none size-4 border border-white/20 rounded-sm checked:bg-(--accent-yellow) checked:border-(--accent-yellow) transition-all cursor-pointer relative"
                />
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  {sys}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Alternator */}
        <div>
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Alternator Tech
          </label>
          <div className="space-y-2">
            {filterOptions.alternatorTechs.map((tech) => (
              <label
                key={tech}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.alternatorTech.includes(tech)}
                  onChange={() => handleFilterChange("alternatorTech", tech)}
                  className="mr-3 appearance-none size-4 border border-white/20 rounded-sm checked:bg-(--accent-yellow) checked:border-(--accent-yellow) transition-all cursor-pointer relative"
                />
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  {tech}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Voltage */}
        <div>
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Starting Voltage
          </label>
          <div className="space-y-2">
            {filterOptions.voltages.map((volt) => (
              <label
                key={volt}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.voltage.includes(volt)}
                  onChange={() => handleFilterChange("voltage", volt)}
                  className="mr-3 appearance-none size-4 border border-white/20 rounded-sm checked:bg-(--accent-yellow) checked:border-(--accent-yellow) transition-all cursor-pointer relative"
                />
                <span className="text-sm group-hover:translate-x-1 transition-transform">
                  {volt}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Power Range Inputs */}
        <div className="md:col-span-2">
          <label className="block text-(--accent-yellow) text-xs font-bold uppercase tracking-wider mb-3">
            Power Range (kVA)
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="number"
                placeholder="Min"
                value={activeFilters.powerRange.min}
                onChange={(e) => handlePowerRangeChange("min", e.target.value)}
                className="w-full bg-(--bg-dark) border border-white/20 rounded px-3 py-2 text-white placeholder-white/30 focus:border-(--accent-yellow) focus:outline-none focus:ring-1 focus:ring-(--accent-yellow) text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="Max"
                value={activeFilters.powerRange.max}
                onChange={(e) => handlePowerRangeChange("max", e.target.value)}
                className="w-full bg-(--bg-dark) border border-white/20 rounded px-3 py-2 text-white placeholder-white/30 focus:border-(--accent-yellow) focus:outline-none focus:ring-1 focus:ring-(--accent-yellow) text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
