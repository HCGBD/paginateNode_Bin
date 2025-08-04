const Auteurs = require("../models/Auteurs");

const create = async (req, res) => {
  try {
    let { nom, prenom, dateNaiss } = req.body;
    dateNaiss = Date.parse(dateNaiss);
    const data = await Auteurs.create({ nom, prenom, dateNaiss });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

const list = async (req, res) => {
  try {
    const data = await Auteurs.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const listById = async (req, res) => {
  try {
    const _id = req.params._id;
    console.log(_id);

    const data = await Auteurs.findOne({ _id });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    let { nom, prenom, dateNaiss } = req.body;
    dateNaiss = Date.parse(dateNaiss);
    const _id = req.params._id;
    const data = await Auteurs.findOneAndUpdate(
      { _id: _id },
      { nom, prenom, dateNaiss },
      { new: true, runValidators: true }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteA = async (req, res) => {
  try {
    const _id = req.params._id;


    const data = await Auteurs.findOneAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  list,
  listById,
  update,
  deleteA
};
