"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { companyInfo } from "@/data/mockData";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Us",
      info: companyInfo.email,
      subtitle: "We reply within 24 hours",
      action: "mailto:" + companyInfo.email,
      actionText: "Send Email",
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Call Us",
      info: companyInfo.phone,
      subtitle: "Mon - Fri, 9:00 AM - 6:00 PM",
      action: "tel:" + companyInfo.phone,
      actionText: "Call Now",
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Visit Us",
      info: companyInfo.address,
      subtitle: "Get directions to our office",
      action: "#",
      actionText: "Get Directions",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Office Hours",
      info: "Monday - Friday",
      subtitle: "9:00 AM - 6:00 PM EST",
      action: "#",
      actionText: "Schedule Visit",
    },
  ];

  const faqs = [
    {
      question: "What types of projects do you handle?",
      answer:
        "We handle a wide range of architectural projects including residential, commercial, interior design, landscape architecture, and renovation projects.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on scope and complexity. A typical residential project might take 6-12 months from concept to completion.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer free initial consultations to discuss your project, understand your needs, and determine how we can best help you.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve clients nationwide, with offices in major cities. We can handle projects remotely or travel as needed.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Get in touch with us to discuss your architectural and design
              needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-accent">{detail.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {detail.title}
                </h3>
                <p className="text-gray-800 font-medium mb-1">{detail.info}</p>
                <p className="text-gray-500 text-sm mb-4">{detail.subtitle}</p>
                <a
                  href={detail.action}
                  className="text-accent hover:text-accent-dark font-medium text-sm transition-colors"
                >
                  {detail.actionText} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-300"
              >
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                  alt="Office Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <FiMapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="font-semibold text-primary">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                    >
                      <h4 className="font-semibold text-primary mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
