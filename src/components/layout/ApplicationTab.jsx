// Icons
import { Building2 } from "lucide-react";

const ApplicationTab = ({ product }) => {
  // Helper for Section Header (Icon is kept here)
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
      <SectionHeader title="Recommended Applications" icon={Building2} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.applications.map((application, index) => (
          <div
            key={index}
            // 👇 COPY THIS CLASSNAME BLOCK (Added hover:-translate-y-1 for tactile feel)
            className="group flex items-center justify-center p-4 bg-(--card-blue)/50ded-lg border border-white/5 hoverhover:border-(--accent-yellow)/50sition-all duration-300"
          >
            <span className="text-(--muted-gray) font-medium tracking-wide group-hover:text-(--accent-yellow) transition-colors text-center font-heading uppercase">
              {application}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTab;
