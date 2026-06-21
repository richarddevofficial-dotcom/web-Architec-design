const { pool } = require("../config/database");

class Project {
  static async findAll(query = {}) {
    let sql = "SELECT * FROM projects WHERE 1=1";
    const params = [];
    if (query.featured === "true") {
      sql += " AND featured = ?";
      params.push(true);
    }
    if (query.category && query.category !== "All") {
      sql += " AND category = ?";
      params.push(query.category);
    }
    sql += " ORDER BY created_at DESC";
    const [rows] = await pool.execute(sql, params);
    return rows.map((row) => ({
      ...row,
      images: row.images ? JSON.parse(row.images) : [],
    }));
  }

  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM projects WHERE id = ?", [
      id,
    ]);
    if (!rows.length) return null;
    const project = rows[0];
    project.images = project.images ? JSON.parse(project.images) : [];
    return project;
  }

  static async create(data) {
    const {
      title,
      description,
      full_description = "",
      category,
      location,
      completion_date,
      images = [],
      featured = false,
      client = "",
      year = new Date().getFullYear().toString(),
    } = data;
    const [result] = await pool.execute(
      "INSERT INTO projects (title, description, full_description, category, location, completion_date, images, featured, client, year) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        title,
        description,
        full_description,
        category,
        location,
        completion_date,
        JSON.stringify(images),
        featured,
        client,
        year,
      ],
    );
    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const allowed = [
      "title",
      "description",
      "full_description",
      "category",
      "location",
      "completion_date",
      "images",
      "featured",
      "client",
      "year",
    ];
    const updates = [],
      params = [];
    for (const [key, value] of Object.entries(data)) {
      if (allowed.includes(key)) {
        updates.push(`${key} = ?`);
        params.push(key === "images" ? JSON.stringify(value) : value);
      }
    }
    if (!updates.length) return null;
    params.push(id);
    await pool.execute(
      `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.execute("DELETE FROM projects WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = Project;
