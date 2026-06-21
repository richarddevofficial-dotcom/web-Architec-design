const { pool } = require("../config/database");

class Contact {
  static async create({ name, email, phone = "", subject, message }) {
    const [result] = await pool.execute(
      "INSERT INTO contacts (name, email, phone, subject, message) VALUES (?,?,?,?,?)",
      [name, email, phone, subject, message],
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.execute(
      "SELECT * FROM contacts ORDER BY created_at DESC",
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM contacts WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  }

  static async markAsRead(id) {
    await pool.execute("UPDATE contacts SET is_read = TRUE WHERE id = ?", [id]);
    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.execute("DELETE FROM contacts WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async getUnreadCount() {
    const [rows] = await pool.execute(
      "SELECT COUNT(*) as count FROM contacts WHERE is_read = FALSE",
    );
    return rows[0].count;
  }
}

module.exports = Contact;
