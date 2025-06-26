
import { agencias } from "../../../../../helper/DatosAgencia";
import BannerAgencia from "../../../../components/AgenciaComponents/BannerAgencia";

// import AgenteHome from "../../../components/AgenciaComponents/AgenteHome";
import ListadoPropiedades from "../../../../components/AgenciaComponents/ListadoPropiedades";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function AgenciaPage({ params }: Props) {
  const { slug } = params;

  
  const agencia = agencias.find((a) => toSlug(a.name) === slug);
  


  if (!agencia) {
      return notFound()
    }
    
    console.log(agencia.customization.secondaryColor);
  return (
    <>
        <BannerAgencia
            bannerImageUrl={agencia.customization.banner}
            logoImage={agencia.customization.logoImage}
            agencyName={agencia.name}
            info={agencia.customization.information}
        />
      <main style={{ backgroundColor: agencia.customization.backgroundColor, padding: 20, minHeight: "70vh" }}>
        {/* <AgenteHome name={agencia.agentUser.name} surname={agencia.agentUser.surname} /> */}
        <ListadoPropiedades
          MainColor={agencia.customization.mainColors}
          SecondaryColor={agencia.customization.secondaryColor}
          
          propiedades={agencia.properties.map((prop) => ({
            ...prop,
            images: prop.images.map((img) => ({
              ...img,
              description: img.description ?? "",
            })),
          }))}
          slug={slug}
        />
      </main>
    </>
  );
}

export const getStaticParams = () => {
  return agencias.map((agencia) => ({
    slug: toSlug(agencia.name),
  }));
}

export const getStaticPaths = () => {
  const paths = getStaticParams().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
}

