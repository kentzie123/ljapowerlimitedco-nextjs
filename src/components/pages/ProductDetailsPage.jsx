"use client";

// Hooks
import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Changed from react-router-dom

// Next Components
import Link from "next/link";
import Image from "next-image-export-optimizer";

// Components
import SpecificationTab from "../layout/SpecificationTab";
import FeaturesTab from "../layout/FeaturesTab";
import ApplicationTab from "../layout/ApplicationTab";
import CertificationsTab from "../layout/CertificationsTab";

// Stores
import { useProductStore } from "@/stores/useProductStore";

// Data
import { generators } from "@/constants";

// Icons
import {
  ArrowLeft,
  Phone,
  Mail,
  Zap,
  Fuel,
  Gauge,
  Cog,
  Activity,
} from "lucide-react";

// Helper
const formatCategory = (cat) => {
  if (!cat) return "";
  return cat
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ProductDetailsPage = () => {
  const { addSelectedProduct } = useProductStore();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("specifications");

  const router = useRouter(); // Replaces useNavigate
  const params = useParams(); // Replaces useParams
  const slug = params?.slug;

  const product = generators.find((items) => items.slug === slug);

  // --- 404 STATE ---
  if (!product) {
    return (
      <div className="min-h-screen bg-(--bg-dark) pt-[60px] flex-center text-white">
        <div className="flex-center flex-col text-center">
          <h1 className="font-heading text-4xl font-bold uppercase mb-4 tracking-wide">
            Product Not Found
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="btn-yellow px-8 py-3 font-heading uppercase tracking-wider"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Safe Image Access
  const mainImageSrc =
    product.images?.[activeImage] || "/images/placeholder-generator.jpg";

  return (
    // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
    <div className="min-h-screen bg-(--bg-dark) pt-[60px]">
      {/* Navigation Bar */}
      {/* Fixed: bg-[var(--bg-surface)] -> bg-(--bg-surface) */}
      <nav className="bg-(--bg-surface) border-b border-white/5 shadow-lg sticky top-[70px] z-30 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push("/products")}
              // Fixed: text-[var(--muted-gray)] -> text-(--muted-gray)
              // Fixed: hover:text-[var(--accent-yellow)] -> hover:text-(--accent-yellow)
              className="cursor-pointer flex items-center text-(--muted-gray) hover:text-(--accent-yellow) font-heading uppercase tracking-wider text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Generators
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div>
            {/* Fixed: border-[var(--panel-blue)] -> border-(--panel-blue) */}
            {/* Fixed: bg-[var(--bg-surface)] -> bg-(--bg-surface) */}
            <div className="overflow-hidden rounded-xl shadow-2xl border border-(--panel-blue) mb-6 bg-(--bg-surface) relative group">
              <div className="relative aspect-4/3 overflow-hidden flex items-center justify-center">
                <Image
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  src={mainImageSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(10,31,42,0.4)_100%)] pointer-events-none" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  // Fixed: bg-[var(--bg-surface)] -> bg-(--bg-surface)
                  // Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow)
                  // Fixed: border-[var(--panel-blue)] -> border-(--panel-blue)
                  className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 aspect-square bg-(--bg-surface) ${
                    activeImage === index
                      ? "border-(--accent-yellow) shadow-[0_0_10px_rgba(246,231,42,0.3)]"
                      : "border-(--panel-blue) hover:border-white/30"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover p-1"
                    sizes="150px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT SPECS --- */}
          <div className="flex flex-col">
            <div className="mb-8 border-b border-white/10 pb-8">
              {/* Category Badge */}
              {/* Fixed: bg-[var(--panel-blue)] -> bg-(--panel-blue) */}
              {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
              {/* Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow) */}
              <span className="inline-flex items-center bg-(--panel-blue) text-(--accent-yellow) text-lg px-3 py-1 rounded-sm mb-4 font-heading uppercase tracking-widest border border-(--accent-yellow)/20">
                {formatCategory(product.category)} • {product.type} SERIES
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading uppercase tracking-tight text-white mb-4 leading-none">
                {product.engine}
              </h1>
              {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
              <p className="text-(--muted-gray) text-lg leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: Zap,
                  label: "Standby Power",
                  value: product.standbyPower,
                },
                {
                  icon: Gauge,
                  label: "Prime Power",
                  value: product.primePower,
                },
                { icon: Cog, label: "Model", value: product.name },
                { icon: Fuel, label: "Fuel Type", value: product.fuelType },
              ].map(({ icon: Icon, label, value }, i) => (
                <div
                  key={i}
                  // Fixed: bg-[var(--bg-surface)] -> bg-(--bg-surface)
                  // Fixed: border-[var(--panel-blue)] -> border-(--panel-blue)
                  // Fixed: border-[var(--accent-yellow)] -> border-(--accent-yellow)
                  className="bg-(--bg-surface) p-4 rounded-lg border border-(--panel-blue) hover:border-(--accent-yellow)/50 transition-colors group"
                >
                  <div className="flex items-center mb-2">
                    {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                    <Icon className="h-4 w-4 text-(--accent-yellow) mr-2 group-hover:scale-110 transition-transform" />
                    {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
                    <span className="font-heading uppercase text-xs text-(--muted-gray) tracking-wider">
                      {label}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white font-heading tracking-wide">
                    {value || "N/A"}
                  </p>
                </div>
              ))}
            </div>

            {/* Operation Conditions */}
            {product.operationConditions && (
              // Fixed: bg-[var(--card-blue)] -> bg-(--card-blue)
              <div className="bg-(--card-blue)/30 rounded-lg border border-white/5 p-5 mb-8 backdrop-blur-sm">
                <div className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                  {/* Fixed: text-[var(--accent-yellow)] -> text-(--accent-yellow) */}
                  <Activity className="size-4 text-(--accent-yellow)" />
                  Operation Conditions
                </div>
                {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
                <div className="grid grid-cols-3 gap-4 text-sm text-(--muted-gray)">
                  <div>
                    <span className="block text-xs opacity-50 uppercase">
                      Altitude
                    </span>
                    {product.operationConditions?.altitude || "N/A"}
                  </div>
                  <div>
                    <span className="block text-xs opacity-50 uppercase">
                      Temp
                    </span>
                    {product.operationConditions?.temperature || "N/A"}
                  </div>
                  <div>
                    <span className="block text-xs opacity-50 uppercase">
                      Derating
                    </span>
                    {product.operationConditions?.derating || "N/A"}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-auto space-y-4">
              <Link
                href="/contacts"
                onClick={() => {
                  addSelectedProduct(product);
                }}
                className="btn-yellow block w-full text-center py-4 font-heading uppercase tracking-widest text-lg shadow-[0_0_20px_rgba(246,231,42,0.2)] hover:shadow-[0_0_30px_rgba(246,231,42,0.4)]"
              >
                Request Quote
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:09157495102"
                  className="btn-blue w-full flex items-center justify-center font-heading uppercase tracking-wider text-sm py-3"
                >
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </a>
                <a
                  href="mailto:lja.ljapowerlimitedco@gmail.com"
                  className="btn-blue w-full flex items-center justify-center font-heading uppercase tracking-wider text-sm py-3"
                >
                  <Mail className="h-4 w-4 mr-2" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-20 lg:mt-28">
          <div className="border-b border-white/10">
            <nav className="flex space-x-8 overflow-x-auto no-scrollbar">
              {[
                "specifications",
                "features",
                "applications",
                "certifications",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                      py-4 px-2 border-b-2 font-heading font-bold uppercase tracking-widest text-sm transition-all duration-300
                      ${
                        activeTab === tab
                          ? "border-(--accent-yellow) text-(--accent-yellow)"
                          : "border-transparent text-(--muted-gray) hover:text-white hover:border-white/30"
                      }
                    `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-10 min-h-[300px] animate-in fade-in duration-500">
            {activeTab === "specifications" && (
              <SpecificationTab product={product} />
            )}
            {activeTab === "features" && <FeaturesTab product={product} />}
            {activeTab === "applications" && (
              <ApplicationTab product={product} />
            )}
            {activeTab === "certifications" && (
              <CertificationsTab product={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
