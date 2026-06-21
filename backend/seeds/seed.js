require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const { initializeTables } = require("../config/database");
const Admin = require("../models/Admin");
const Project = require("../models/Project");

const seed = async () => {
  console.log("\n🌱 Seeding Manuella Architects database...\n");

  await initializeTables();

  // Create default admin
  const existingAdmin = await Admin.findByUsernameOrEmail("admin");
  if (!existingAdmin) {
    await Admin.create({
      username: "admin",
      email: "admin@manuellaarchitects.com",
      password: "admin123",
    });
    console.log("✅ Admin created: admin / admin123");
  } else {
    console.log("⚠️  Admin already exists");
  }

  // Sample projects
  const { pool } = require("../config/database");
  const [existing] = await pool.execute(
    "SELECT COUNT(*) as count FROM projects",
  );

  if (existing[0].count === 0) {
    const projects = [
      {
        title: "Modern Lakeside Villa",
        description:
          "A stunning modern villa with panoramic lake views and sustainable design.",
        full_description:
          "This breathtaking lakeside villa represents the pinnacle of modern residential architecture.",
        category: "Residential",
        location: "Lake View, Juba",
        completion_date: "2024-03-15",
        images: JSON.stringify([]),
        featured: true,
        client: "Johnson Family",
        year: "2024",
      },
      {
        title: "Corporate Headquarters",
        description:
          "Cutting-edge corporate headquarters for a leading tech company.",
        full_description:
          "Innovative design that redefines the modern workplace with collaborative spaces.",
        category: "Commercial",
        location: "Hai Malakal, Juba",
        completion_date: "2024-01-20",
        images: JSON.stringify([]),
        featured: true,
        client: "TechCorp South Sudan",
        year: "2024",
      },
      {
        title: "Garden Residence",
        description:
          "Eco-friendly residential landscape design with native plants.",
        full_description:
          "A perfect harmony between architecture and nature in a serene environment.",
        category: "Landscape",
        location: "Gudele, Juba",
        completion_date: "2023-11-10",
        images: JSON.stringify([]),
        featured: false,
        client: "Green Living Community",
        year: "2023",
      },
    ];

    for (const project of projects) {
      await Project.create(project);
    }
    console.log(`✅ ${projects.length} sample projects created`);
  } else {
    console.log("⚠️  Projects already exist");
  }

  console.log("\n✅ Seeding complete!");
  console.log("📋 Admin Login: admin / admin123\n");
  process.exit(0);
};

seed();
