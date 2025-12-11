// Icons
import { Award, FileCheck, ShieldCheck } from "lucide-react";

const CertificationsTab = ({ product }) => {
  // Helper for Section Header
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
      <SectionHeader title="Compliance & Standards" icon={Award} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engine Certs */}
        <div className="bg-(--card-blue) p-6 rounded-lg border border-white/10 hover:border-(--accent-yellow)/30 transition-colors group">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="size-5 text-(--accent-yellow)" />
            <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider group-hover:text-(--accent-yellow) transition-colors">
              Engine Certifications
            </h4>
          </div>
          <p className="text-(--muted-gray) text-sm leading-relaxed font-mono bg-black/20 p-4 rounded border border-white/5">
            {product.certifications.engine}
          </p>
        </div>

        {/* Alternator Certs */}
        <div className="bg-(--card-blue) p-6 rounded-lg border border-white/10 hover:border-(--accent-yellow)/30 transition-colors group">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="size-5 text-(--accent-yellow)" />
            <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider group-hover:text-(--accent-yellow) transition-colors">
              Alternator Certifications
            </h4>
          </div>
          <p className="text-(--muted-gray) text-sm leading-relaxed font-mono bg-black/20 p-4 rounded border border-white/5">
            {product.certifications.alternator}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificationsTab;
