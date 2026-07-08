import { eq } from 'drizzle-orm';
import { db } from '../db';
import { unitTable } from '../db/schema';
import { UnitType } from '@kasir/types';

export class UnitsRepository {
  getAllUnits = async () => {
    const units = await db.select().from(unitTable);
    return units;
  }

  getUnitsById = async (unitId: number) => {
    const [unit] = await db.select().from(unitTable).where(eq(unitTable.id, unitId)).limit(1);
    return unit;
  }

  createUnit = async (newUnit: UnitType) => {
    const newUnitData = await db.insert(unitTable).values(newUnit);
    return newUnitData;
  }
}