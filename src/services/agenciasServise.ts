import axios from 'axios';

export const getAgencies = async () => {
  try {
    const response = await axios.get('http://191.235.34.31:3000/agency/luxury-estates');
    console.log('Agencias:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las agencias:', error);
    return null;
  }
};

