const { default: axios } = require('axios');

const API_URL = 'https://delivery-whats.onrender.com/foods'

const getAllProducts = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getProductChoice = async (numProduct) => {
  try {
    const { data } = await axios.get(
      `${API_URL}?num_product=${numProduct}`,
    );
    return data[0];
  } catch (err) {
    console.log(err);
  }
};

exports.api = {
  getAllProducts,
  getProductChoice,
};
