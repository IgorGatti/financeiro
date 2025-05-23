const express = require('express');

function createCrudRoutes(model, routeBase) {
  const router = express.Router();

  // Listar todos
  router.get('/', async (req, res) => {
    try {
      const items = await model.findAll();
      res.render(`${routeBase}/index`, { 
        items,
        modelName: routeBase
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar registros');
    }
  });

  // Formulário de adicionar
  router.get('/add', (req, res) => {
    res.render(`${routeBase}/form`, { 
      category: {}, 
      action: `/${routeBase}/add`,
      modelName: routeBase,
      title: 'Nova ' + routeBase.charAt(0).toUpperCase() + routeBase.slice(1)
    });
  });

  // Adicionar novo
  router.post('/add', async (req, res) => {
    try {
      await model.add(req.body);
      res.redirect(`/${routeBase}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao adicionar registro');
    }
  });

  // Formulário de editar
  router.get('/edit/:id', async (req, res) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) return res.status(404).send('Registro não encontrado');
      res.render(`${routeBase}/form`, { 
        category: item, 
        action: `/${routeBase}/edit/${item.id}`,
        title: 'Editar ' + routeBase.charAt(0).toUpperCase() + routeBase.slice(1),
        modelName: routeBase
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar registro');
    }
  });

  // Atualizar
  router.put('/edit/:id', async (req, res) => {
    try {
      await model.update(req.params.id, req.body);
      res.redirect(`/${routeBase}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar registro');
    }
  });

  // Deletar
  router.post('/delete/:id', async (req, res) => {
    try {
      await model.delete(req.params.id);
      res.redirect(`/${routeBase}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar registro');
    }
  });

  return router;
}

module.exports = createCrudRoutes;