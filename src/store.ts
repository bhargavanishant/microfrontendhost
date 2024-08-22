// src/store.js in Remote App
import { create } from "zustand";
import _ from "lodash";

export const useStore: any = create((set: any) => ({
  data: [],
  filters: {},
  reset: false,
  resetFilters: () =>
    set((state: any) => ({
      reset: !state.reset,
      filters: {},
    })),
  setFilters: (key: any, value: any) => {
    return set((state: any) => ({
      filters: {
        ..._.cloneDeep(state.filters),
        [key]: value,
      },
    }));
  },
  setData: (data: any) =>
    set((state: any) => ({
      data: [...state.data, ...data],
      filters: { ...state.filters, ...data },
    })),
  filterData: (fieldKey: any, value: any) =>
    set((state: any) => ({
      data: [
        ...state.data.filter((data: any) => {
          return data[fieldKey] === value;
        }),
      ],
    })),
}));
