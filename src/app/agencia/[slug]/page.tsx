import { agencias } from "../../../../helper/DatosAgencia";
// import { notFound } from "next/navigation";

import BannerAgencia from "../../../components/AgenciaComponents/BannerAgencia";
import FooterAgencia from "@/components/AgenciaComponents/FooterAgencia";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
  SecondaryColor: string;
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function AgenciaLanding({ params, SecondaryColor }: Props) {
  const { slug } = params;
  const agencia = agencias.find((a) => toSlug(a.name) === slug);
  console.log(SecondaryColor)
  if (!agencia) return notFound();

  return (
    <div className="min-h-screen flex flex-col">

      <BannerAgencia
        bannerImageUrl={agencia.customization.banner}
        logoImage={agencia.customization.logoImage}
        agencyName={agencia.name}
        info={agencia.customization.information}
      />

      <main
        className="flex-grow flex justify-center px-4 py-8"
        style={{
          color: agencia.customization.mainColors,
        }}
      >
        
        <div
          className="w-full max-w-3xl bg-gray-200 rounded-lg p-6 shadow-md"
          style={{
            color: agencia.customization.secondaryColor,
          }}
        >
          <h2
            className="text-center font-bold mb-6 text-2xl sm:text-3xl"
            style={{
              color: agencia.customization.mainColors,
            }}
          >
            Sobre Nosotros
          </h2>
          <p className="text-base sm:text-lg">{agencia.description}</p>
        </div>
      </main>

      <footer className="pt-8">
        <FooterAgencia agenciaName={agencia.name} />
      </footer>
    </div>
  );
}
