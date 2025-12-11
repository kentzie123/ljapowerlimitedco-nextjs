// Icons
import { Check, ShieldCheck } from "lucide-react";

const FeaturesTab = ({ product }) => {
  // Helper for Section Header (Consistent with Specs Tab)
  const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
      <div className="bg-(--panel-blue) p-2 rounded-md text-(--accent-yellow) shadow-lg">
        <Icon className="size-6" />
      </div>
      <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionHeader
        title="System Features & Capabilities"
        icon={ShieldCheck}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {product.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start p-4 rounded-lg bg-(--card-blue)/50 border border-white/5 hover:border-(--accent-yellow)/50 hover:bg-(--card-blue) transition-all duration-300 group"
          >
            {/* Icon Box */}
            <div className="mt-0.5 mr-4 bg-(--accent-yellow)/10 p-1.5 rounded-md group-hover:bg-(--accent-yellow) transition-colors duration-300">
              <Check className="h-4 w-4 text-(--accent-yellow) group-hover:text-black" />
            </div>

            {/* Text */}
            <span className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesTab;
