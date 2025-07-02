interface Props {
  id: string;
  onBack: () => void;
}

const EditarPropiedad: React.FC<Props> = ({ id, onBack }) => {
  return (
    <div className="p-6 border border-gray-400 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Editando propiedad con ID: {id}</h2>
      {/* Lógica de edición va acá */}
      <button
        onClick={onBack}
        className="mt-4 bg-[#230c89] text-white px-4 py-2 rounded hover:bg-[#1a0666] transition"
      >
        Volver
      </button>
    </div>
  );
};

export default EditarPropiedad;
