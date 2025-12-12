"use client";

// Icons
import { MapPin, Phone, Clock, Navigation, PhoneCall } from "lucide-react";

// Routing
import Link from "next/link"; // Changed from react-router-dom

const ContactCard = ({ contact, setLocation, selectedContact }) => {
  const isSelected = contact.slug === selectedContact.slug;

  return (
    <div
      onClick={() => setLocation(contact)}
      className={`
        relative p-6 rounded-xl transition-all duration-300 cursor-pointer border-2 group
        ${
          isSelected
            ? "bg-(--card-blue) border-(--accent-yellow) shadow-[0_0_20px_rgba(246,231,42,0.15)] scale-[1.02]"
            : "bg-(--panel-blue) border-transparent hover:border-white/10 hover:bg-(--card-blue)"
        }
      `}
    >
      {/* Active Indicator Dot */}
      {isSelected && (
        <div className="absolute top-4 right-4 size-3 bg-(--accent-yellow) rounded-full shadow-[0_0_10px_var(--accent-yellow)] animate-pulse"></div>
      )}

      {/* Header Info */}
      <div className="flex gap-4 mb-6">
        <div
          className={`
            shrink-0 p-3 rounded-lg h-fit transition-colors duration-300
            ${
              isSelected
                ? "bg-(--accent-yellow) text-black"
                : "bg-(--bg-dark) text-(--accent-yellow) group-hover:text-white"
            }
        `}
        >
          <MapPin className="size-6" />
        </div>

        <div>
          <h3
            className={`font-heading text-xl font-bold uppercase tracking-wide leading-tight mb-1 transition-colors ${
              isSelected ? "text-(--accent-yellow)" : "text-white"
            }`}
          >
            {contact.office}
          </h3>
          <p className="text-sm text-(--muted-gray) leading-snug">
            {contact.address}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-6 pl-1">
        <div className="flex items-center gap-3">
          <Phone className="text-(--accent-yellow) size-4 shrink-0" />
          <span className="text-sm text-gray-300 font-medium tracking-wide">
            {contact.number}
          </span>
        </div>

        <div className="flex gap-3">
          <Clock className="size-4 text-(--accent-yellow) shrink-0 mt-0.5" />
          <div className="text-sm space-y-1 text-gray-300">
            {contact.schedules.map((sched, i) => (
              <div key={i}>{sched}</div>
            ))}
            <div className="text-(--accent-yellow) font-bold text-xs uppercase tracking-wider pt-1">
              • Emergency Service: 24/7
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${contact.number}`}
          className="btn-yellow flex items-center justify-center gap-2 py-2 text-xs md:text-sm font-heading font-bold uppercase tracking-wider hover:-translate-y-1 transition-transform"
        >
          <PhoneCall className="size-4" />
          Call
        </a>

        <Link
          href={contact.direction}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-blue flex items-center justify-center gap-2 py-2 text-xs md:text-sm font-heading font-bold uppercase tracking-wider hover:-translate-y-1 transition-transform border border-white/10"
        >
          <Navigation className="size-4" />
          Map
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
