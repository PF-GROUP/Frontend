import React from "react";

const Cuenta: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      {/* Título */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#230c89] mb-8">Mi Facturación</h2>

      {/* Plan activo */}
      <div className="bg-gray-100 rounded-xl p-4 sm:p-6 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-2">
          <p className="text-lg sm:text-xl font-semibold text-gray-700">
            Plan Activo: <span className="text-[#230c89]">Premium</span>
          </p>
          <p className="text-sm text-gray-600">
            Renovación: <span className="font-medium">20 de Julio de 2025</span>
          </p>
          <p className="text-sm text-gray-600">
            Estado: <span className="text-green-600 font-semibold">Activo</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-[#A62F55] hover:bg-[#831F40] text-white px-5 py-3 font-semibold rounded-lg text-lg transition disabled:opacity-70 disabled:cursor-not-allowed sm:text-base">
            Cancelar suscripción
          </button>
        </div>
      </div>

      {/* Historial de pagos */}
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Historial de Facturación</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 sm:p-4 font-medium">Fecha</th>
              <th className="text-left p-3 sm:p-4 font-medium">Monto</th>
              <th className="text-left p-3 sm:p-4 font-medium">Método</th>
              <th className="text-left p-3 sm:p-4 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {[
              { fecha: "20/05/2025", monto: "$3.000", metodo: "Tarjeta de Crédito" },
              { fecha: "20/04/2025", monto: "$3.000", metodo: "Tarjeta de Crédito" },
              { fecha: "20/03/2025", monto: "$3.000", metodo: "Tarjeta de Crédito" },
            ].map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 sm:p-4">{item.fecha}</td>
                <td className="p-3 sm:p-4">{item.monto}</td>
                <td className="p-3 sm:p-4">{item.metodo}</td>
                <td className="p-3 sm:p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Pagado
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cuenta;
