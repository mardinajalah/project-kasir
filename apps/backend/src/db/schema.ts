import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import * as t from 'drizzle-orm/mysql-core';

export const timestamps = {
  updated_at: t.timestamp().defaultNow(),
  created_at: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp().defaultNow(),
};

export const productTable = table(
  'products',
  {
    id: t.int('id').primaryKey().autoincrement(),
    kodeProduct: t.varchar('kode_product', { length: 255 }).notNull(),
    name: t.varchar('name', { length: 255 }).notNull(),
    buyPrice: t.int('buy_price').notNull(),
    sellPrice: t.int('sell_price').notNull(),
    stock: t.int('stock').notNull(),
    minStock: t.int('min_stock').notNull(),
    categoryId: t
      .int('category_id')
      .notNull()
      .references(() => categoryTable.id),
    unitId: t
      .int('unit_id')
      .notNull()
      .references(() => unitTable.id),
    vendorId: t
      .int('vendor_id')
      .notNull()
      .references(() => vendorTable.id),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('kode_product_idx').on(table.kodeProduct)],
);

export const vendorTable = table(
  'vendor',
  {
    id: t.int('id').primaryKey().autoincrement(),
    kodeVendor: t.varchar('kode_vendor', { length: 255 }).notNull(),
    name: t.varchar('name', { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('kode_vendor_idx').on(table.kodeVendor)],
);

export const categoryTable = table(
  'categories',
  {
    id: t.int('id').primaryKey().autoincrement(),
    kodeCategory: t.varchar('kode_category', { length: 255 }).notNull(),
    name: t.varchar('name', { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('name_idx').on(table.name), t.uniqueIndex('kode_category_idx').on(table.kodeCategory)],
);

export const unitTable = table(
  'units',
  {
    id: t.int('id').primaryKey().autoincrement(),
    name: t.varchar('name', { length: 255 }).notNull(),
    kodeUnit: t.varchar('kode_unit', { length: 255 }).notNull(),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('name_idx').on(table.name), t.uniqueIndex('kode_unit_idx').on(table.kodeUnit)],
);
