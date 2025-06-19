// pages/pago.tsx
"use client";
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAuthContext } from '../../../../context/authContext';
import apiService from '@/services/apiService';

const stripePromise = loadStripe('pk_test_...'); // Reemplaza con tu public key

export default function Pago() {
  const {user} = useAuthContext();
  const[agencia, setAgencia] = useState({id:"1"});

useEffect(() => {
  console.log(user)
  if (!user?.id) return;

  apiService.get(`agency/getByUser/${user.id}`).then((res) => {
    setAgencia(res);
    console.log(res)
  });
}, [user?.id]);

  const [loading, setLoading] = useState(false);
   
  const handleCheckout = async () => {
    setLoading(true);
    try {
      console.log(user);
      const res = await apiService.post(`stripe/checkout/${agencia?.id}`, { email: user?.email }, true);
      console.log(res);

      const stripe = await stripePromise;

      if (stripe && res.id) {
        await stripe.redirectToCheckout({ sessionId: res.id });
      } else {
        alert("Error al redirigir al checkout.");
      }
    } catch  {
      alert("Hubo un error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-in">
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-indigo-600 mx-auto" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Suscripción Premium</h2>
        <p className="text-gray-600 mb-6">
          Accede a contenido exclusivo, soporte prioritario y funciones avanzadas.
        </p>
        <p className="text-xl font-semibold text-indigo-700 mb-6">$9.99 / mes</p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
            loading
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Redirigiendo...' : 'Suscribirme ahora'}
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Cancelá cuando quieras. Sin compromiso.
        </p>
      </div>
    </div>
  );
}