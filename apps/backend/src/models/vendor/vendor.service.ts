import { VendorType } from '@kasir/types';

interface VendorRepository {
  getAllVendors(): Promise<VendorType[]>;
  getVendorById(id: number): Promise<VendorType | undefined>;
  createVendor(newData: VendorType): Promise<unknown>;
};

export class VendorService {
  private vendorRepository;

  constructor(vendorRepository: VendorRepository) {
    this.vendorRepository = vendorRepository;
  }

  async getAllVendors() {
    const vendor = await this.vendorRepository.getAllVendors();
    return vendor;
  }

  async getVendorById(vendorId: number) {
    const vendor = await this.vendorRepository.getVendorById(vendorId);
    return vendor;
  }

  async createVendor(newVendor: VendorType) {
    const dataVendor = await this.vendorRepository.createVendor(newVendor);
    return dataVendor;
  }
}
