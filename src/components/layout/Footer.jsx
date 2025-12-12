import Link from "next/link";
import Image from "next-image-export-optimizer";
import { Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white relative bg-[linear-gradient(to_bottom_left,#0c2430_15%,#145d77_85%)] backdrop-blur-sm py-12 px-6 md:px-16 lg:px-24 border-t border-(--accent-yellow)/20 shadow-[0_-4px_15px_rgba(245,236,25,0.05)]">
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6">
        {/* LEFT CONTENT: Brand & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative size-12 rounded-full border border-(--accent-yellow)/30 shadow-md bg-white/5 overflow-hidden">
              <Image
                src="/images/lja-logo.webp"
                alt="LJA Power Limited Co Logo"
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>

            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide leading-none">
                LJA Power Limited Co
              </h2>
              <p className="text-(--muted-gray) text-xs font-medium tracking-wider mt-1">
                Your Trusted Energy Lifeline ⚡
              </p>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <Link
              href="https://www.facebook.com/marc88fyi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 transition-transform hover:scale-110"
              aria-label="Visit our Facebook Page"
            >
              <Facebook className="text-white bg-[#1877F2] p-1.5 size-9 rounded-full" />
            </Link>
          </div>
        </div>

        {/* MIDDLE: Quick Links */}
        <div className="text-center md:text-left">
          <div className="font-heading font-bold uppercase tracking-wider text-(--accent-yellow) mb-4">
            Quick Links
          </div>

          <ul className="text-(--muted-gray) text-sm space-y-2">
            {[
              { name: "About Us", href: "/about" },
              { name: "Products", href: "/products" },
              { name: "Services", href: "/services" },
              { name: "Our Works", href: "/our-works" },
              { name: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  // REPLACED CSS: Added hover:text-(--accent-yellow) directly here
                  className="hover:text-(--accent-yellow) transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MIDDLE: Services */}
        <div className="text-center md:text-left">
          <div className="font-heading font-bold uppercase tracking-wider text-(--accent-yellow) mb-4">
            Services
          </div>

          <ul className="text-(--muted-gray) text-sm space-y-2">
            {[
              "Site Assessment & Planning",
              "Expert Installation (ATS)",
              "Preventive Maintenance",
              "24/7 Emergency Support",
              "Parts & Service Availability",
              "Compliance Assistance",
            ].map((item, index) => (
              // These are static text, but if you want them to hover yellow too,
              // just add: className="hover:text-(--accent-yellow) transition-colors cursor-default"
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT CONTENT: Locations & Legal */}
        <div className="text-center md:text-right space-y-4">
          <div className="space-y-1">
            <p className="text-(--muted-gray) text-sm">
              © {currentYear} LJA Power Limited Co{" "}
              <br className="hidden md:block" />
              All rights reserved.
            </p>

            <div className="flex justify-center md:justify-end gap-2 text-xs text-gray-500 flex-wrap">
              {[
                {
                  name: "Cagayan de Oro",
                  url: "https://maps.app.goo.gl/LJvxpcku46hKaceZA",
                },
                {
                  name: "Bukidnon",
                  url: "https://maps.app.goo.gl/LJvxpcku46hKaceZA",
                },
                {
                  name: "Zamboanga Del Sur",
                  url: "https://maps.app.goo.gl/LJvxpcku46hKaceZA",
                },
              ].map((loc, i) => (
                <span key={loc.name} className="flex items-center">
                  {i > 0 && <span className="mr-2 text-gray-700">•</span>}
                  <Link
                    className="hover:text-(--accent-yellow) transition-colors"
                    href={loc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {loc.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          <p className="text-(--muted-gray) text-xs">
            Need assistance?{" "}
            <Link
              href="/contact"
              className="text-(--accent-yellow) font-semibold hover:underline transition"
            >
              Contact us today.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
