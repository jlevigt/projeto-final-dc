import pool from "../config/database.js";

class LinkRepository {
  constructor() {
    this.listLinks = this.listLinks.bind(this);
    this.listLinksByUsername = this.listLinksByUsername.bind(this);
    this.createLink = this.createLink.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.deleteLink = this.deleteLink.bind(this);
  }

  async listLinks(user_id) {
    const query = {
      text: "SELECT * FROM links WHERE user_id=$1",
      values: [user_id],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async listLinksByUsername(username) {
    const query = {
      text: `
        SELECT links.* 
        FROM links
        JOIN users ON users.id = links.user_id
        WHERE users.username = $1 AND links.public = true
      `,
      values: [username],
    };

    const result = await pool.query(query);

    return result.rows;
  }

  async createLink(postData) {
    const query = {
      text: "INSERT INTO LINKS (user_id, title, url, public) VALUES ($1, $2, $3, $4)",
      values: [postData.user_id, postData.title, postData.url, postData.public],
    };

    await pool.query(query);

    return;
  }

  async updateLink(updateData) {
    const query = {
      text: "UPDATE links SET title=$1, url=$2, public=$3 WHERE id=$4",
      values: [
        updateData.title,
        updateData.url,
        updateData.public,
        updateData.id,
      ],
    };

    await pool.query(query);

    return;
  }

  async deleteLink(id) {
    const query = {
      text: "DELETE FROM links WHERE id=$1",
      values: [id],
    };

    await pool.query(query);

    return;
  }
}

export default LinkRepository;
