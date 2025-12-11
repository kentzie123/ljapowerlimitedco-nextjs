// Icons for Section Headers only
import { Zap, Cog, Activity } from "lucide-react";

const SpecificationTab = ({ product }) => {
  // Helper component (Cleaner: No Icon, just Data)
  const SpecItem = ({ label, value }) => (
    <div className="bg-(--card-blue)/50 p-4 rounded-lg border border-white/5 hover:border-(--accent-yellow)/50 transition-colors group flex flex-col justify-center h-full">
      <span className="font-heading text-xs uppercase tracking-widest text-(--muted-gray) group-hover:text-(--accent-yellow) transition-colors mb-1">
        {label}
      </span>
      <p className="text-white font-bold text-lg leading-tight wrap-break-word">
        {value || "N/A"}
      </p>
    </div>
  );

  // Section Header (Kept the icons here)
  const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
      <div className="bg-(--panel-blue) p-2 rounded-md text-(--accent-yellow) shadow-lg">
        <Icon className="size-6" />
      </div>
      <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. GENERAL GENERATOR SPECS */}
      <section>
        <SectionHeader title="Generator Set Data" icon={Zap} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpecItem label="Standby Power" value={product.standbyPower} />
          <SpecItem label="Prime Power" value={product.primePower} />
          <SpecItem label="Speed" value={product.speed} />
          <SpecItem label="Frequency" value={product.frequency} />
          <SpecItem label="Starting Voltage" value={product.startingVoltage} />
          <SpecItem label="Fuel Capacity" value={product.fuelCapacity} />
          <SpecItem label="Connection Mode" value={product.connectionMode} />
          <SpecItem label="Type" value={product.type} />

          {/* Full Width Items for long text */}
          <div className="md:col-span-2 lg:col-span-2">
            <SpecItem label="Voltage Options" value={product.voltageOptions} />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <SpecItem
              label="Dimensions & Weight"
              value={`${product.dimensions} / ${product.weight}`}
            />
          </div>
        </div>
      </section>

      {/* 2. ENGINE SPECS */}
      <section>
        <SectionHeader title="Engine Specifications" icon={Cog} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(product.engineSpecs).map(([key, value]) => (
            <SpecItem
              key={key}
              label={key.replace(/([A-Z])/g, " $1").trim()} // Adds space before capital letters
              value={value}
            />
          ))}
        </div>
      </section>

      {/* 3. ALTERNATOR SPECS */}
      <section>
        <SectionHeader title="Alternator Specifications" icon={Activity} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(product.alternatorSpecs).map(([key, value]) => (
            <SpecItem key={key} label={key} value={value} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SpecificationTab;
