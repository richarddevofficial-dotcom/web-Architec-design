"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheck,
  FiArrowRight,
  FiMessageCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = () => {
    const { firstName, lastName, email, phone, service, message } = formData;

    if (!firstName || !email || !service || !message) {
      alert(
        "Please fill in all required fields: First Name, Email, Service, and Message",
      );
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `Project Inquiry: ${service} - ${fullName}`;
    const body = `
Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service}

Message:
${message}

---
Sent from Emmanuella Designs Contact Form
    `.trim();

    // Open default email client
    const mailtoLink = `mailto:info@emmanuelladesigns.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const sendWhatsApp = () => {
    const { firstName, lastName, phone, service, message } = formData;

    if (!firstName || !service || !message) {
      alert(
        "Please fill in all required fields: First Name, Service, and Message",
      );
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const whatsappMessage = `
*New Project Inquiry*

👤 *Name:* ${fullName}
📧 *Email:* ${formData.email || "Not provided"}
📱 *Phone:* ${phone || "Not provided"}
🏗️ *Service:* ${service}

💬 *Message:*
${message}

---
Sent from Emmanuella Designs Website
    `.trim();

    // Replace with your WhatsApp number (include country code, no + or spaces)
    const whatsappNumber = "+211928661250"; // CHANGE THIS TO YOUR ACTUAL WHATSAPP NUMBER
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink, "_blank");
  };

  const services = [
    "Architectural Design",
    "Interior Design",
    "Landscape Architecture",
    "Commercial Design",
    "Renovation",
    "Project Management",
    "Other",
  ];

  const contactCards = [
    {
      icon: <FiPhone size={24} />,
      title: "Call Us",
      content: "+211928661250",
      sub: "Mon-Fri 9am-6pm",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FiMail size={24} />,
      title: "Email Us",
      content: "info@emmanuelladesigns.com",
      sub: "We reply within 24hrs",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Visit Us",
      content: "123 Design Street",
      sub: "Architecture City, AC 12345",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const faqs = [
    {
      q: "What types of projects do you handle?",
      a: "We specialize in residential, commercial, interior design, landscape architecture, and renovation projects of all scales.",
    },
    {
      q: "How long does a typical project take?",
      a: "Timelines vary by project scope. A typical residential project takes 6-12 months from concept to completion.",
    },
    {
      q: "Do you offer free consultations?",
      a: "Yes! We offer complimentary initial consultations to understand your vision and discuss how we can help.",
    },
    {
      q: "What is your design process?",
      a: "Our process includes consultation, concept development, design refinement, documentation, and construction oversight.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl text-white lg:text-7xl font-bold mb-6 tracking-tight">
              Let's <span className="text-red-500">Discuss</span> Your Project
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a vision in mind? Fill out the form below and reach us
              instantly via Email or WhatsApp.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Contact Cards */}
      <section className="relative -mt-16 pb-8 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${card.color} text-white rounded-2xl shadow-xl p-6 text-center`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                <p className="font-medium">{card.content}</p>
                <p className="text-sm text-white/70 mt-1">{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Send a Message
                </h2>
                <p className="text-gray-500 mb-8">
                  Fill out the form and choose how to reach us.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                      placeholder="Tell us about your project, ideas, budget, and timeline..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Email Button */}
                    <motion.button
                      onClick={sendEmail}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                    >
                      <FiMail size={20} />
                      <span>Send via Email</span>
                      <FiArrowRight size={18} />
                    </motion.button>

                    {/* WhatsApp Button */}
                    <motion.button
                      onClick={sendWhatsApp}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all"
                    >
                      <FaWhatsapp size={22} />
                      <span>Send via WhatsApp</span>
                      <FiArrowRight size={18} />
                    </motion.button>
                  </div>

                  <p className="text-center text-xs text-gray-400 mt-2">
                    Click Email to open your mail app • Click WhatsApp to open
                    chat
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* How It Works */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  How It Works
                </h3>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-red-500 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Fill the Form
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Enter your details and project info
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Choose Channel
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Email or WhatsApp - one click
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-500 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Get Response
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        We reply within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Prefer to Call?</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call Us Directly</p>
                      <p className="font-semibold">+1 (555) 123-4567</p>
                    </div>
                    <FiArrowRight
                      size={20}
                      className="ml-auto group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                  <a
                    href="mailto:info@emmanuelladesigns.com"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email Directly</p>
                      <p className="font-semibold text-sm">
                        info@emmanuelladesigns.com
                      </p>
                    </div>
                    <FiArrowRight
                      size={20}
                      className="ml-auto group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/15551234567?text=Hello! I'm interested in your architectural services."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 rounded-3xl shadow-xl p-6 sm:p-8 text-white hover:bg-green-600 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FaWhatsapp size={30} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Chat on WhatsApp</p>
                    <p className="text-green-100 text-sm">
                      Quick response guaranteed
                    </p>
                  </div>
                  <FiArrowRight
                    size={24}
                    className="ml-auto group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: activeFaq === i ? 45 : 0 }}
                    className="text-2xl text-gray-400 flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === i ? "auto" : 0,
                    opacity: activeFaq === i ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
