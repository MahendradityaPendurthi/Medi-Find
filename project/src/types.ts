export interface Dose {
  id: string;
  name: string;
  time: string;
  days: string[];
}

export interface Pharmacy {
  id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  medicines: {
    name: string;
    price: number;
    discount: number;
  }[];
}