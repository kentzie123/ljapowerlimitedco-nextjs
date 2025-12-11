import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  selectedProducts: [],

  addSelectedProduct: (value) => {
    set({ selectedProducts: [...get().selectedProducts, value] });
  },
}));
