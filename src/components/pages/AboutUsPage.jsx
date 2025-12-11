"use client";

// Next.js Components
import Image from "next/image";

// Components
import PageNavigationHeader from "../layout/PageNavigationHeader";

// Icons
import { CheckCircle2, Target, Eye, Award } from "lucide-react";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
  const containerRef = useRef(null);

  const whyChooseUsData = [
    {
      title: "Expert Team",
      desc: "Certified technicians and engineers dedicated to delivering reliable power solutions and unmatched service.",
    },
    {
      title: "Reliable Products",
      desc: "High-quality generators and power systems that ensure continuous productivity and safety for your business.",
    },
    {
      title: "Customer Service Support",
      desc: "Round-the-clock online assistance and emergency service to keep your operations running smoothly.",
    },
    {
      title: "Innovative Solutions",
      desc: "Cutting-edge technologies designed to optimize energy efficiency and meet your evolving power needs.",
    },
    {
      title: "Customer Focus",
      desc: "We prioritize your satisfaction, providing personalized solutions tailored to your business requirements.",
    },
    {
      title: "Proven Track Record",
      desc: "Trusted by businesses across the region for consistent performance, reliability, and excellence.",
    },
  ];

  useGSAP(
    () => {
      // Main Header Animation
      const mainHeaderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-header",
          start: "top 80%",
        },
      });

      mainHeaderTimeline
        .from(".abt-title", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .from(
          ".abt-content p",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Parallax Effect for Images
      gsap.to(".abt-float-right", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".main-header",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".abt-float-left", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".main-header",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Why Choose Us Cards
      gsap.fromTo(
        ".wcu-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#why-choose-us",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
      className="bg-(--bg-dark) text-white overflow-hidden"
    >
      {/* NOTE: Check your PageNavigationHeader component. 
         Ensure it accepts a string string for 'src' and handles standard <Image> or <img>.
      */}
      <PageNavigationHeader
        h1="About"
        h1Yellow="LJA Power Limited Co"
        p="Leading the power generation industry with innovative solutions and unwavering commitment to excellence"
        id="about-page-hero"
        src="/images/about-main-image.webp" // Direct Path from public/
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* SECTION 1: COMPANY INFO */}
      <div className="section-container px-6 lg:px-12 py-20 lg:py-32">
        <section className="main-header grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="relative order-2 lg:order-1">
            <Image
              className="right-quote absolute w-24 opacity-10 -top-16 right-0 pointer-events-none"
              src="/images/right-quote.png"
              alt="quote decoration"
              width={96}
              height={96}
            />

            <div className="relative z-10">
              <h2 className="abt-title font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-8">
                Our <span className="text-(--accent-yellow)">Company</span>
              </h2>

              <div className="abt-content space-y-6 text-(--muted-gray) text-lg leading-relaxed">
                <p>
                  LJA Power Limited Co is a trusted provider of reliable and
                  efficient energy solutions for homes, businesses, and
                  industries. We are committed to delivering high-quality power
                  services with a focus on safety, innovation, and customer
                  satisfaction.
                </p>
                <p>
                  Our services include power generation equipment,
                  installations, maintenance, and energy consulting, all
                  tailored to meet the unique needs of each client.
                </p>

                {/* Fixed: bg-[var(--card-blue)] -> bg-(--card-blue) */}
                <div className="flex items-start gap-4 p-4 bg-(--card-blue) rounded-lg border-l-4 border-(--accent-yellow)">
                  <Award className="text-(--accent-yellow) size-8 shrink-0" />
                  <p className="text-white text-sm italic">
                    "Values sustainability and community development,
                    implementing environmentally responsible practices."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Composition */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            {/* Main Image */}
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-(--bg-dark)">
              <Image
                className="w-full max-w-md object-cover"
                src="/images/about-main-image.webp"
                alt="LJA Power Limited Co Office"
                width={720}
                height={540}
                priority // Load this fast as it is above the fold
              />
            </div>

            {/* Floating Images */}
            <div className="abt-float-right absolute -top-12 -right-12 w-48 lg:w-64 rounded-lg shadow-xl z-0 opacity-80 border-2 border-(--card-blue) pointer-events-none overflow-hidden">
              <Image
                src="/images/about-float-right.webp"
                alt="Decorative"
                width={256}
                height={256}
                className="object-cover"
              />
            </div>

            <div className="abt-float-left absolute -bottom-12 -left-12 w-40 lg:w-56 rounded-lg shadow-xl z-20 border-2 border-(--accent-yellow) pointer-events-none overflow-hidden">
              <Image
                src="/images/abt3.webp"
                alt="Decorative"
                width={224}
                height={224}
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: MISSION / VISION / VALUES (Checkerboard Grid) */}
      <section className="bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Mission Text */}
          <div className="bg-(--card-blue) p-14 flex flex-col justify-center group hover:bg-[#1a5f7a] transition-colors duration-300 md:order-1">
            <Target className="size-12 text-(--accent-yellow) mb-6" />
            <div className="font-heading text-4xl font-bold uppercase tracking-tight mb-4">
              Our <br />
              <span className="text-(--accent-yellow)">Mission</span>
            </div>
            <p className="text-(--muted-gray) group-hover:text-white transition-colors">
              To deliver innovative and sustainable energy solutions that
              empower industries, communities, and future generations while
              upholding integrity, safety, and costumer satisfaction.
            </p>
          </div>

          {/* 2. Mission Image */}
          <div className="relative group overflow-hidden h-80 md:h-auto md:order-2">
            <Image
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src="/images/abt3.webp"
              alt="Mission"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-(--accent-yellow)/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* 3. Vision Text */}
          <div className="bg-(--card-blue) p-14 flex flex-col justify-center group hover:bg-[#1a5f7a] transition-colors duration-300 border-l border-white/5 md:order-4 lg:order-3">
            <Eye className="size-12 text-(--accent-yellow) mb-6" />
            <div className="font-heading text-4xl font-bold uppercase tracking-tight mb-4">
              Our <br />
              <span className="text-(--accent-yellow)">Vision</span>
            </div>
            <p className="text-(--muted-gray) group-hover:text-white transition-colors">
              To become the leading provider of energy solutions in the
              Philippines, known for our commitment to quality, sustainability,
              and excellence in every project we undertake.
            </p>
          </div>

          {/* 4. Vision Image */}
          <div className="relative group overflow-hidden h-80 md:h-auto md:order-3 lg:order-4">
            <Image
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src="/images/abt4.webp"
              alt="Vision"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-(--card-blue)/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* 5. Values Text */}
          <div className="bg-(--accent-yellow) text-(--bg-dark) p-14 flex flex-col justify-center md:order-5 lg:order-5">
            <Award className="size-12 text-(--bg-dark)" />
            <div className="font-heading text-4xl font-bold uppercase tracking-tight mb-4">
              Our <br />
              <span>Values</span>
            </div>
            <p className="font-medium text-(--bg-dark)/80">
              Trustworthy, Reliable, Innovative, Customer Focus, Integrity &
              Excellence.
            </p>
          </div>

          {/* 6. Values Image */}
          <div className="relative group overflow-hidden h-80 md:h-auto md:order-6 lg:order-6">
            <Image
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              src="/images/about-float-right.webp"
              alt="Values"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section id="why-choose-us" className="bg-(--card-blue) py-24">
        <div className="section-container px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Why Businesses{" "}
              <span className="text-(--accent-yellow)">Choose Us</span>
            </h2>
            <div className="h-1 w-20 bg-(--accent-yellow) mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsData.map((item, i) => (
              <div
                key={i}
                // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
                className="wcu-card group p-8 bg-(--bg-dark)/50 border border-white/5 rounded-xl hover:bg-(--bg-dark) hover:border-(--accent-yellow) transition-all duration-300 hover:-translate-y-2 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-(--accent-yellow)/10 p-3 rounded-lg group-hover:bg-(--accent-yellow) transition-colors duration-300">
                    <CheckCircle2 className="size-6 text-(--accent-yellow) group-hover:text-(--bg-dark)" />
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide group-hover:text-(--accent-yellow) transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-(--muted-gray) group-hover:text-gray-300 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
