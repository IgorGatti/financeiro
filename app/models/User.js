const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor() {
    super('users'); // nome da tabela
  }

  // Você pode adicionar métodos específicos aqui se quiser
}

module.exports = new User(); // já exporta instância