
export enum Status {
  DISPONIBLE="Disponible",
  VENDIDO= "Vendido"
}

export enum Type {
  ALQUILER="Alquiler",
  VENTA="Venta"
}

export interface IPropertyForm {
  name: string;
  status: Status; // enum
  type: Type;     // enum
  address: string;
  city: string;
  price: number;
  m2: number;
  bathrooms: number;
  rooms: number;
  description: string;
  id_images?: string[];
  type_of_property_id: string;   // Id seleccionado del select de tipos
  agency: string;                
}

