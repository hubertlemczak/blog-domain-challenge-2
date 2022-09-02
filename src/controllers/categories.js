const model = require('../models/categories');
const { generalErrors, categoriesErrors } = require('../utils/errors');
const { SUCCESS } = require('../utils/vars');

const getAllCategories = async (req, res) => {
  const [status, dbRes] = await model.getAllCategories();

  if (status === SUCCESS) {
    return res.status(200).json({
      categories: dbRes,
    });
  }

  generalErrors(res, 500);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.createCategory(name);

  if (status === SUCCESS) {
    return res.status(200).json({
      category: dbRes,
    });
  }

  if (dbRes === 'P2002') {
    return categoriesErrors(res, 409);
  }

  generalErrors(res, 500);
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  const categoryId = parseInt(req.params.categoryId);

  if (!name) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.updateCategory(categoryId, name);

  if (status === SUCCESS) {
    return res.status(200).json({
      category: dbRes,
    });
  }

  if (dbRes === 'P2002') {
    return categoriesErrors(res, 409);
  }

  if (dbRes === 'P2025') {
    return categoriesErrors(res, 404);
  }

  generalErrors(res, 500);
};

const deleteCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  const [status, dbRes] = await model.deleteCategory(categoryId);

  if (status === SUCCESS) {
    return res.status(200).json({
      category: dbRes,
    });
  }

  if (dbRes === 'P2025') {
    return categoriesErrors(res, 404);
  }

  generalErrors(res, 500);
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
