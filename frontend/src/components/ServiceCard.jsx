"use client";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="card p-8 h-full hover:border-accent border-2 border-transparent">
        {/* Icon */}
        <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <FiCheck className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
