export type ProductType = {
  id: number;
  kode: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  categoryId: number;
  unitId: number;
};

export type UnitType = {
  id: number;
  name: string;
};

export type CategoryType = {
  id: number;
  name: string;
};