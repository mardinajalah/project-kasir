import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import * as t from 'drizzle-orm/mysql-core';

export const timestamps = {
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp(),
}

export const productTable = table(
  'products',
  {
    id: t.int('id').primaryKey().autoincrement(),
    kode: t.varchar('kode', { length: 255 }).notNull(),
    name: t.varchar('name', { length: 255 }).notNull(),
    buyPrice: t.int('buy_price').notNull(),
    sellPrice: t.int('sell_price').notNull(),
    stock: t.int('stock').notNull(),
    minStock: t.int('min_stock').notNull(),
    categoryId: t.int('category_id').notNull().references(() => categoryTable.id),
    unitId: t.int('unit_id').notNull().references(() => unitTable.id),
    ...timestamps
  },
  (table) => [
    t.unique('kode').on(table.kode)
  ]
);


export const categoryTable = table(
  'categories',
  {
    id: t.int('id').primaryKey().autoincrement(),
    name: t.varchar('name', { length: 255 }).notNull(),
    ...timestamps
  },
  (table) => [
    t.unique('name').on(table.name)
  ]
);

export const unitTable = table(
  'units',
  {
    id: t.int('id').primaryKey().autoincrement(),
    name: t.varchar('name', { length: 255 }).notNull(),
    ...timestamps
  },
  (table) => [
    t.unique('name').on(table.name)
  ]
);
