const BaseModel = require('./BaseModel');
const bcrypt = require('bcryptjs');
const pool = require('../db');

class User extends BaseModel {
    constructor() {
        super('users');
    }

    async findByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    }

    async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    async add(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const result = await pool.query(
            `INSERT INTO users (
                username,
                email,
                password,
                nome_completo,
                data_criacao,
                data_atualizacao,
                ultimo_login,
                ativo
            ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, true) RETURNING *`,
            [
                userData.username,
                userData.email,
                hashedPassword,
                userData.nome_completo
            ]
        );
        return result.rows[0];
    }

    async verifyPassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }

    async updateLastLogin(userId) {
        const result = await pool.query(
            'UPDATE users SET ultimo_login = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
            [userId]
        );
        return result.rows[0];
    }

    async updateProfile(userId, userData) {
        const allowedFields = ['username', 'nome_completo', 'email'];
        const updates = {};
        
        for (const field of allowedFields) {
            if (userData[field] !== undefined) {
                updates[field] = userData[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return null;
        }

        updates.data_atualizacao = 'CURRENT_TIMESTAMP';

        const setClause = Object.keys(updates)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');

        const values = [userId, ...Object.values(updates)];
        const result = await pool.query(
            `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
            values
        );
        return result.rows[0];
    }

    async deactivateUser(userId) {
        const result = await pool.query(
            'UPDATE users SET ativo = false WHERE id = $1 RETURNING *',
            [userId]
        );
        return result.rows[0];
    }

    async activateUser(userId) {
        const result = await pool.query(
            'UPDATE users SET ativo = true WHERE id = $1 RETURNING *',
            [userId]
        );
        return result.rows[0];
    }
}

module.exports = new User();