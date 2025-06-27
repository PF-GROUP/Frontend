/* eslint-disable @next/next/no-img-element */
interface ContactoAgenteProps {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export default function ContactoAgente({ name, surname, email, phone }: ContactoAgenteProps) {
  return (
    <section className="bg-white py-8 px-6 max-w-md mx-auto rounded-2xl shadow-lg text-center mb-12">
  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
    <img
      src="/avatar.png" 
      alt={`${name}`}
      className="w-full h-full object-cover"
    />
  </div>

  <h2 className="text-xl font-semibold text-gray-800">{name} {surname}</h2>


  <p className="text-gray-600 mt-2">
    Email:{" "}
    <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
      {email}
    </a>
  </p>


  <p className="text-gray-600 mt-1">
    Teléfono:{" "}
    <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
      {phone}
    </a>
  </p>
</section>

  );
}
