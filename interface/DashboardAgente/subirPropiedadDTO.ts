
export enum Status {
    AVAILABLE = 'AVAILABLE',
    SOLD = 'SOLD',
    RESERVED = 'RESERVED',
  // etc
}

export enum Type {
  HOUSE = 'HOUSE',             // CASA
  APARTMENT = 'APARTMENT',     // DEPARTAMENTO
  COMMERCIAL = 'COMMERCIAL',   // LOCAL COMERCIAL
  LAND = 'LAND',               // TERRENO
  OFFICE = 'OFFICE',           // OFICINA
  WAREHOUSE = 'WAREHOUSE',     // GALPÓN
}

export interface IPropertyForm {
    name: string;
    status: Status
    type: Type;
    address: string;
    city: string;
    price: number;
    m2: number;
    bathrooms: number;
    rooms: number;
    description: string;
    id_images?: string[]; // Opcional si todavía no se subieron imágenes
    agency: string | number
}