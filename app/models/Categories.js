const BaseModel = require('./BaseModel');
const pool = require('../db');

class Categories extends BaseModel {
    constructor() {
        super('categories');
        // Array com os campos permitidos para criar/atualizar
        this.allowedFields = ['name', 'description', 'status'];
    }

    // Método para preparar os dados antes de salvar
    prepareData(formData) {
        // Filtra apenas os campos permitidos
        const categoryData = {};
        this.allowedFields.forEach(field => {
            if (formData[field] !== undefined) {
                categoryData[field] = formData[field];
            }
        });
        return categoryData;
    }

    // Criar categoria com os campos permitidos
    async createFromForm(formData) {
        const categoryData = this.prepareData(formData);
        const result = await this.add(categoryData);
        return result.rows[0];
    }

    // Atualizar categoria com os campos permitidos
    async updateFromForm(id, formData) {
        const categoryData = this.prepareData(formData);
        const result = await this.update(id, categoryData);
        return result.rows[0];
    }
}

module.exports = new Categories();