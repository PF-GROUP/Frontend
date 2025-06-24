"use client";
import axios from 'axios';
import { useEffect } from 'react';

const AgenciesComponent = () => {
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await axios.get('http://191.235.34.31:3000/agency/luxury-estates');
        console.log(res.data);
      } catch (err) {
        console.error('Error:', err.message);
      }
    };

    fetchAgencies();
  }, []);

  return <div>Revisá la consola para ver las agencias</div>;
};

export default AgenciesComponent;