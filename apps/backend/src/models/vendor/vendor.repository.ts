import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { vendorTable } from '../../db/schema';
import { VendorType } from '@kasir/types';

export class VendorRepository {
  async getAllVendors() {
    const vendors = await db.select().from(vendorTable);
    return vendors;
  }

  async getVendorById(vendorId: number) {
    const [vendor] = await db.select().from(vendorTable).where(eq(vendorTable.id, vendorId)).limit(1);
    return vendor;
  }

  async createVendor(newVendor: VendorType) {
    const newVendorData = await db.insert(vendorTable).values(newVendor);
    return newVendorData;
  }
}
