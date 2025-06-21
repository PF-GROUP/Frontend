interface ContactoAgenteProps {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export default function ContactoAgente({ name, surname, email, phone }: ContactoAgenteProps) {
  return (
    <section className="bg-gray-100 py-12 px-4 max-w-4xl mx-auto rounded shadow-md mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contacto del Agente</h2>
      <p className="text-center mb-2">
        <strong>{name} {surname}</strong>
      </p>
      <p className="text-center mb-1">
        Email:{" "}
        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
          {email}
        </a>
      </p>
      <p className="text-center">
        Teléfono:{" "}
        <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
          {phone}
        </a>
      </p>
    </section>
  );
}
