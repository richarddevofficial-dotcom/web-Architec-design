const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");

class Admin {
  static async create({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    return result.insertId;
  }

  static async findByUsernameOrEmail(identifier) {
    const [rows] = await pool.execute(
      "SELECT * FROM admins WHERE username = ? OR email = ?",
      [identifier, identifier],
    );
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      "SELECT id, username, email, created_at FROM admins WHERE id = ?",
      [id],
    );
    return rows[0] || null;
  }

  static async comparePassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
  }
}

module.exports = Admin;
