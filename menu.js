const API_URL = 'https://api-express-ycx5.onrender.com/product';

const getAllProducts = async () => {
  try {
    const { data } = await axios.get(API_URL);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const menu = [];

exports.menu = menu;
