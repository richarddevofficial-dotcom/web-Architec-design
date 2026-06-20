import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const stats = [
    { value: "150+", label: "Projects" },
    { value: "200+", label: "Clients" },
    { value: "15+", label: "Years Exp." },
    { value: "25+", label: "Awards" },
  ];

  const services = [
    {
      icon: "🏗️",
      title: "Architectural Design",
      desc: "Innovative and functional solutions for residential and commercial spaces.",
    },
    {
      icon: "🎨",
      title: "Interior Design",
      desc: "Beautiful and practical interior spaces that reflect your style.",
    },
    {
      icon: "🌿",
      title: "Landscape Architecture",
      desc: "Outdoor spaces that harmonize with nature.",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Modern Lakeside Villa",
      category: "Residential",
      location: "California",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
    },
    {
      id: 2,
      title: "Urban Corporate HQ",
      category: "Commercial",
      location: "New York",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
    },
    {
      id: 3,
      title: "Garden Residence",
      category: "Landscape",
      location: "Oregon",
      image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920"
            alt="Architecture"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Transforming Spaces,
            <span className="block text-red-500 mt-2">
              Creating Experiences
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-2xl mx-auto px-2">
            We design and build extraordinary spaces that inspire, innovate, and
            transform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/portfolio"
              className="w-full sm:w-auto bg-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-red-600 transition-colors text-center"
            >
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-white hover:text-gray-900 transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 sm:-mt-20 z-20 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-xl p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Welcome to{" "}
                <span className="text-red-500">Emmanuella Designs</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                With over 15 years of experience, we transform visions into
                reality through innovative architectural design.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                From residential masterpieces to commercial landmarks, every
                project reflects our dedication to excellence.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors"
              >
                Learn More <span>→</span>
              </Link>
            </div>
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"
                alt="About"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-transparent hover:border-red-500"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-red-600 transition-colors"
            >
              View All Services <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-gray-900">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project) => (
              <Link
                href={`/portfolio/${project.id}`}
                key={project.id}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {project.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 sm:px-8 py-2.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors"
            >
              View All Projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-red-500 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90">
            Let's create something extraordinary together. Contact us today for
            a free consultation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-red-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-lg hover:bg-gray-100 transition-colors"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
