require('dotenv').config();
const { default: axios } = require('axios');

const getAllProducts = async () => {
  try {
    const { data } = await axios.get(process.env.API_URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getProductChoice = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/${id}`);
    return data[0];
  } catch (err) {
    console.log(err);
  }
};

exports.api = {
  getAllProducts,
  getProductChoice,
};
