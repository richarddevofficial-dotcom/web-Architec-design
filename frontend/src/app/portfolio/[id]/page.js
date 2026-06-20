"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/data/mockData";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  FiMapPin,
  FiCalendar,
  FiUser,
  FiTag,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const found = portfolioProjects.find((p) => p.id === parseInt(params.id));
      setProject(found);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) return <LoadingSpinner />;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link href="/portfolio" className="btn-primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = portfolioProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? portfolioProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < portfolioProjects.length - 1
      ? portfolioProjects[currentIndex + 1]
      : null;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={project.images[selectedImage]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-accent text-white px-4 py-1 rounded-full text-sm">
                {project.category}
              </span>
              <span className="text-white/80 text-sm">{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>
                  {new Date(project.completionDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>Client: {project.client}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative h-48 rounded-xl overflow-hidden cursor-pointer ${
                  selectedImage === index ? "ring-4 ring-accent" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Project Overview
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.fullDescription}
                </p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h3 className="text-xl font-bold text-primary mb-6">
                  Project Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 flex items-center mb-1">
                      <FiTag className="mr-2" /> Category
                    </label>
                    <p className="font-medium text-gray-800">
                      {project.category}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 flex items-center mb-1">
                      <FiMapPin className="mr-2" /> Location
                    </label>
                    <p className="font-medium text-gray-800">
                      {project.location}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 flex items-center mb-1">
                      <FiCalendar className="mr-2" /> Completion Date
                    </label>
                    <p className="font-medium text-gray-800">
                      {new Date(project.completionDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                        },
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 flex items-center mb-1">
                      <FiUser className="mr-2" /> Client
                    </label>
                    <p className="font-medium text-gray-800">
                      {project.client}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center block"
                  >
                    Start a Similar Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-500">Previous Project</div>
                  <div className="font-medium">{prevProject.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            <Link
              href="/portfolio"
              className="btn-secondary hidden sm:inline-flex"
            >
              View All Projects
            </Link>

            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-accent transition-colors text-right"
              >
                <div>
                  <div className="text-sm text-gray-500">Next Project</div>
                  <div className="font-medium">{nextProject.title}</div>
                </div>
                <FiArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
