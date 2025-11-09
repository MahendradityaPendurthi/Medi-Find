import { create } from 'zustand';
import { Dose, Pharmacy } from './types';

interface StoreState {
  doses: Dose[];
  addDose: (dose: Omit<Dose, 'id'>) => void;
  removeDose: (id: string) => void;
  pharmacies: Pharmacy[];
  searchPharmacies: (query: string) => Pharmacy[];
}

export const useStore = create<StoreState>((set, get) => ({
  doses: [],
  addDose: (dose) => {
    const newDose = { ...dose, id: crypto.randomUUID() };
    set((state) => ({ doses: [...state.doses, newDose] }));
  },
  removeDose: (id) => {
    set((state) => ({
      doses: state.doses.filter((dose) => dose.id !== id),
    }));
  },
  pharmacies: [
    {
      id: '1',
      name: 'HealthCare Pharmacy',
      distance: 0.5,
      address: '123 Main St',
      rating: 4.5,
      medicines: [
        { name: 'Paracetamol', price: 5.99, discount: 10 },
        { name: 'Aspirin', price: 4.99, discount: 5 },
        { name: 'Ibuprofen', price: 6.99, discount: 0 },
      ],
    },
    {
      id: '2',
      name: 'MediCare Plus',
      distance: 1.2,
      address: '456 Oak Ave',
      rating: 4.2,
      medicines: [
        { name: 'Paracetamol', price: 6.99, discount: 15 },
        { name: 'Aspirin', price: 5.99, discount: 0 },
        { name: 'Amoxicillin', price: 12.99, discount: 20 },
      ],
    },
    {
      id: '3',
      name: 'City Pharmacy',
      distance: 2.0,
      address: '789 Pine St',
      rating: 4.7,
      medicines: [
        { name: 'Paracetamol', price: 5.49, discount: 5 },
        { name: 'Ibuprofen', price: 7.99, discount: 10 },
        { name: 'Cetirizine', price: 8.99, discount: 0 },
      ],
    },
  ],
  searchPharmacies: (query) => {
    const { pharmacies } = get();
    if (!query.trim()) return pharmacies;
    
    const searchTerm = query.toLowerCase().trim();
    return pharmacies.filter((pharmacy) => {
      // Search in pharmacy name
      if (pharmacy.name.toLowerCase().includes(searchTerm)) return true;
      
      // Search in medicines
      return pharmacy.medicines.some((med) =>
        med.name.toLowerCase().includes(searchTerm)
      );
    });
  },
}));