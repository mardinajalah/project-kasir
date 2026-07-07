import { eq } from 'drizzle-orm';
import { db } from '../db';
import { unitTable } from '../db/schema';
import { UnitType } from '@kasir/types';

export const getAllUnits = async () => {
  const units = await db.select().from(unitTable);
  return units;
};

export const getUnitById = async (unitId: number) => {
  const [unit] = await db
    .select()
    .from(unitTable)
    .where(eq(unitTable.id, unitId))
    .limit(1);

  return unit;
};

export const createUnit = async (newunit: UnitType) => {
  const newunitData = await db.insert(unitTable).values(newunit);
  return newunitData;
}