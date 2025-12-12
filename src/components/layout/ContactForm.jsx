"use client";

// Hooks
import { useState, useRef, useEffect } from "react";

// reCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

// Stores
import { useContactStore } from "@/stores/useContactStore";
import { useProductStore } from "@/stores/useProductStore";

// Data
import { generators } from "@/constants";

// Icons
import { ChevronDown, X, Search, Check } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

const SingleSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full min-h-[50px] px-3 py-2 rounded-md cursor-pointer
          bg-(--bg-dark) border transition-all duration-200
          flex items-center justify-between gap-2 group
          ${
            isOpen
              ? "border-white ring-1 ring-white/20"
              : "border-(--card-blue) hover:border-white/50"
          }
        `}
      >
        <span
          // Fixed: text-[var(--white)] -> text-white
          // Fixed: text-[var(--muted-gray)] -> text-(--muted-gray)
          className={`text-sm ${value ? "text-white" : "text-(--muted-gray)"}`}
        >
          {selectedLabel || placeholder}
        </span>

        {/* Fixed: text-[var(--muted-gray)] -> text-(--muted-gray) */}
        <ChevronDown
          className={`text-(--muted-gray) transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
          size={16}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        // Fixed: bg-[var(--bg-dark)] -> bg-(--bg-dark)
        // Fixed: border-[var(--card-blue)] -> border-(--card-blue)
        <div className="absolute z-50 w-full mt-2 bg-(--bg-dark) border border-(--card-blue) rounded-lg shadow-xl overflow-hidden animate-fadeIn">
          <div className="py-1">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  // Fixed: bg-[var(--panel-blue)] -> bg-(--panel-blue)
                  // Fixed: text-[var(--muted-gray)] -> text-(--muted-gray)
                  // Fixed: hover:bg-[var(--panel-blue)] -> hover:bg-(--panel-blue)
                  className={`
                    flex items-center justify-between px-3 py-2.5 cursor-pointer text-sm transition-colors
                    ${
                      isSelected
                        ? "bg-(--panel-blue) text-white"
                        : "text-(--muted-gray) hover:bg-(--panel-blue) hover:text-white"
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check size={14} className="text-blue-400" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const MultiSelect = ({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const removeOption = (option, e) => {
    e.stopPropagation();
    const newSelected = selected.filter((item) => item !== option);
    onChange(newSelected);
  };

  const clearAll = (e) => {
    e.stopPropagation();
    onChange([]);
    setSearchTerm("");
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full min-h-[50px] px-3 py-2 rounded-md cursor-pointer
          bg-(--bg-dark) border transition-all duration-200
          flex items-center justify-between gap-2 group
          ${
            isOpen
              ? "border-white ring-1 ring-white/20"
              : "border-(--card-blue) hover:border-white/50"
          }
        `}
      >
        <div className="flex flex-wrap gap-2 flex-1">
          {selected.length === 0 ? (
            <span className="text-(--muted-gray) text-sm select-none">
              {placeholder}
            </span>
          ) : (
            selected.map((option) => (
              <div
                key={option}
                onClick={(e) => e.stopPropagation()}
                className="
                  flex items-center gap-1.5 pl-2.5 pr-1 py-1 
                  bg-(--panel-blue) border border-(--card-blue) 
                  text-white rounded-full text-xs font-medium 
                  hover:border-blue-400/50 transition-colors
                "
              >
                <span>{option}</span>
                <button
                  type="button"
                  onClick={(e) => removeOption(option, e)}
                  className="p-0.5 rounded-full hover:bg-white/10 text-(--muted-gray) hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-(--card-blue)/50 h-5">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-(--muted-gray) hover:text-white transition-colors"
              title="Clear all"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            className={`text-(--muted-gray) transition-transform duration-300 ${
              isOpen ? "rotate-180 text-white" : ""
            }`}
            size={16}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-(--bg-dark) border border-(--card-blue) rounded-lg shadow-xl overflow-hidden animate-fadeIn">
          <div className="p-2 border-b border-(--card-blue) bg-(--panel-blue)/30 backdrop-blur-sm">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-(--muted-gray)"
                size={14}
              />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-9 pr-3 py-2 
                           bg-(--bg-dark) text-white 
                           border border-(--card-blue) rounded-md 
                           placeholder-(--muted-gray) text-sm
                           focus:outline-none focus:border-blue-400"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-6 text-(--muted-gray) text-sm text-center">
                No generators found
              </div>
            ) : (
              filteredOptions.map((option, i) => {
                const isSelected = selected.includes(option);
                return (
                  <div
                    key={i}
                    onClick={() => toggleOption(option)}
                    className={`
                      group flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm transition-all mb-0.5
                      ${
                        isSelected
                          ? "bg-(--panel-blue) text-white"
                          : "text-(--muted-gray) hover:bg-(--panel-blue) hover:text-white"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-4 h-4 rounded border flex items-center justify-center transition-colors
                        ${
                          isSelected
                            ? "bg-blue-500 border-blue-500"
                            : "border-(--muted-gray) group-hover:border-white"
                        }
                      `}
                    >
                      {isSelected && (
                        <Check size={12} className="text-white stroke-3" />
                      )}
                    </div>
                    <span
                      className={`flex-1 ${isSelected ? "font-medium" : ""}`}
                    >
                      {option}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {selected.length > 0 && (
            <div className="px-3 py-2 bg-(--panel-blue)/30 border-t border-(--card-blue)">
              <p className="text-xs text-(--muted-gray) flex justify-between">
                <span>{selected.length} selected</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const ContactForm = () => {
  const { selectedProducts } = useProductStore();
  const form = useRef();
  const { sendEmail } = useContactStore();
  const [captchaValid, setCaptchaValid] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [contactForm, setContactForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    companyAddress: "",
    options: "",
    selectedGenerators: [],
    message: "",
  });

  useEffect(() => {
    const formatted = selectedProducts.map((gen) => {
      return `${gen.engine} - ${gen.standbyPower
        .replace("Kw / ", "")
        .replace("Kva", "KVA")}`;
    });

    setContactForm((prev) => ({
      ...prev,
      selectedGenerators: formatted,
    }));
  }, [selectedProducts]);

  const generatorOptions = generators.map(
    (gen) =>
      `${gen.engine} - ${gen.standbyPower
        .replace("Kw / ", "")
        .replace("Kva", "KVA")}`
  );

  const sortedGeneratorOptions = [...generatorOptions].sort();

  // Options for SingleSelect
  const deliveryOptions = [
    { value: "Pickup", label: "Pick-up" },
    { value: "Delivery", label: "Delivery" },
  ];

  useEffect(() => {
    const { fullname, email, message } = contactForm;
    if (fullname && email && message) {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
      setCaptchaValid(false);
    }
  }, [contactForm]);

  const handleCaptcha = (value) => {
    setCaptchaValid(!!value);
  };

  const sendEmailToLJA = (e, form) => {
    e.preventDefault();

    if (!captchaValid) {
      alert("Please verify that you are not a robot.");
      return;
    }

    sendEmail(form);
    setContactForm({
      fullname: "",
      email: "",
      phone: "",
      company: "",
      companyAddress: "",
      options: "",
      selectedGenerators: [],
      message: "",
    });
    setCaptchaValid(false);
    setShowCaptcha(false);
  };

  return (
    <form
      ref={form}
      onSubmit={(e) => sendEmailToLJA(e, form.current)}
      className="contact-form bg-(--panel-blue) p-4 py-6 md:p-8 rounded-2xl"
    >
      <div className="space-y-6">
        {/* FULL NAME */}
        <div>
          <label htmlFor="fullname" className="mb-2">
            FULLNAME *
          </label>
          <input
            value={contactForm.fullname}
            onChange={(e) =>
              setContactForm({ ...contactForm, fullname: e.target.value })
            }
            id="fullname"
            name="fullname"
            required
            type="text"
            placeholder="Enter your full name"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="email" className="mb-2">
            EMAIL ADDRESS *
          </label>
          <input
            value={contactForm.email}
            onChange={(e) =>
              setContactForm({ ...contactForm, email: e.target.value })
            }
            id="email"
            name="email"
            required
            type="email"
            placeholder="your.email@example.com"
          />
        </div>

        {/* PHONE */}
        <div>
          <label htmlFor="phone" className="mb-2">
            PHONE NUMBER
          </label>
          <input
            value={contactForm.phone}
            onChange={(e) =>
              setContactForm({ ...contactForm, phone: e.target.value })
            }
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (123) 456-7890"
          />
        </div>

        {/* COMPANY */}
        <div>
          <label htmlFor="company" className="mb-2">
            COMPANY NAME
          </label>
          <input
            value={contactForm.company}
            onChange={(e) =>
              setContactForm({ ...contactForm, company: e.target.value })
            }
            id="company"
            name="company"
            type="text"
            placeholder="Your company name"
          />
        </div>

        {/* COMPANY ADDRESS */}
        <div>
          <label htmlFor="companyAddress" className="mb-2">
            COMPANY / DELIVERY ADDRESS
          </label>
          <input
            value={contactForm.companyAddress}
            onChange={(e) =>
              setContactForm({
                ...contactForm,
                companyAddress: e.target.value,
              })
            }
            id="companyAddress"
            name="companyAddress"
            type="text"
            placeholder="Street, City, State, ZIP Code"
          />
        </div>

        {/* OPTIONS (Single Select) */}
        <div>
          <label htmlFor="options" className="mb-2">
            OPTIONS
          </label>
          {/* Hidden input to ensure value is sent with form submission */}
          <input type="hidden" name="options" value={contactForm.options} />

          <SingleSelect
            options={deliveryOptions}
            value={contactForm.options}
            onChange={(value) =>
              setContactForm({ ...contactForm, options: value })
            }
            placeholder="Select an option"
          />
        </div>

        {/* GENERATOR SELECTION (Multi Select) */}
        <div>
          <label htmlFor="generators" className="mb-2 block">
            GENERATORS OF INTEREST (Optional)
            <span className="text-(--muted-gray) text-xs font-normal ml-1">
              - Select multiple options
            </span>
          </label>

          <input
            type="hidden"
            name="selectedGenerators"
            value={JSON.stringify(contactForm.selectedGenerators)}
          />

          <MultiSelect
            options={sortedGeneratorOptions}
            selected={contactForm.selectedGenerators}
            onChange={(selected) =>
              setContactForm({ ...contactForm, selectedGenerators: selected })
            }
            placeholder="Click to select generators..."
            className="mt-1"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label htmlFor="message" className="mb-2">
            MESSAGE *
          </label>
          <textarea
            value={contactForm.message}
            onChange={(e) =>
              setContactForm({ ...contactForm, message: e.target.value })
            }
            className="h-auto! resize-none"
            name="message"
            id="message"
            rows={6}
            required
            placeholder="Please provide details about your inquiry..."
          ></textarea>
        </div>

        {/* reCAPTCHA */}
        {showCaptcha && (
          <div className="flex justify-center py-2 transition-all duration-300 animate-fadeIn">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // Use NEXT_PUBLIC_ env var
              onChange={handleCaptcha}
              theme="dark"
            />
          </div>
        )}

        {/* BUTTON */}
        <button
          className="btn-yellow w-full cursor-pointer mt-2 disabled:opacity-50
                     font-medium text-base py-3 rounded-md
                     transition-all duration-200 hover:brightness-110"
          disabled={!showCaptcha || !captchaValid}
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
