
import { PropertyType, PropertyStatus, TransactionType } from './enum';
import { IImage, ICreateImage } from './Image'; 

export interface IProperty {
  id: number;
  name: string;
  type_of_property: PropertyType;
  status: PropertyStatus;
  type: TransactionType; // Tipo de transacción (ej. 'rent', 'sell'). Foreign Key al ENUM.
  address: string;
  city: string;
  price: number;
  m2: number;
  images: IImage[];
  bathroom: number;
  description: string;
  rooms: number;
  agencyId: number;
  date: string;
}

export interface ICreateAgency {
  name: string;
  type_of_property: PropertyType;
  status: PropertyStatus;
  type: TransactionType;
  address: string;
  city: string;
  price: number;
  m2: number;
  images: ICreateImage[];
  bathroom: number;
  description: string;
  rooms: number;
  agencyId: number;
  date?: string;
}

export interface UpdatePropertyDTO {
  name?: string;
  type_of_property?: PropertyType;
  status?: PropertyStatus;
  type?: TransactionType;
  address?: string;
  city?: string;
  price?: number;
  m2?: number;
  images?: (IImage | ICreateImage)[];
  bathroom?: number;
  description?: string;
  rooms?: number;
  agencyId?: number;
  date?: string;
}