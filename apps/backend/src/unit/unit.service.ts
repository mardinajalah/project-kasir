import { UnitType } from '@kasir/types';

interface UnitRepository {
  getAllUnits(): Promise<UnitType[]>;
  getUnitsById(id: number): Promise<UnitType | undefined>;
  createUnit(newData: UnitType): Promise<unknown>;
};

export class UnitService {
  private unitRepository;

  constructor(unitRepository: UnitRepository) {
    this.unitRepository = unitRepository;
  }

  async getAllUnits() {
    const unit = await this.unitRepository.getAllUnits();
    return unit;
  }

  async getUnitsById(unitId: number) {
    const unit = await this.unitRepository.getUnitsById(unitId);
    return unit;
  }

  async createUnit(newUnit: UnitType) {
    const dataUnit = await this.unitRepository.createUnit(newUnit);
    return dataUnit;
  }
}
