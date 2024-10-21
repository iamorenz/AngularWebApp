import { Package } from "./package";

export class Driver {
  driver_id: string;
  driver_name: string;
  driver_department: string;
  driver_license: string;
  driver_isActive: boolean;
  driver_createdAt: string;
  _id!: string;
  assigned_packages!: Package[];

  constructor(name: string, dep: string, lic: string, isActive: boolean) {
    this.driver_id = this.generateDriverId();
    this.driver_name = this.validateName(name);
    this.driver_department = this.validateDepartment(dep);
    this.driver_license = this.validateLicense(lic);
    this.driver_isActive = isActive ? true : false;
    this.driver_createdAt = new Date().toLocaleString();
  }

  private generateDriverId(): string {
    const stuID = '32';
    const randomDigit = Math.floor(Math.random() * 90 + 10);
    const randomLetter = this.generateRandomLetter(3);
    return `D${stuID}-${randomDigit}-${randomLetter}`;
  }

  private generateRandomLetter(len: number): string {
    return Array.from({ length: len }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('');
  }

  private validateName(name: string): string {
    return typeof name === 'string' && name.length >= 3 && name.length <= 20
      ? name
      : '';
  }

  private validateDepartment(dep: string): string {
    const departments = ['Food', 'Furniture', 'Electronic'];
    return departments.includes(dep) ? dep : '';
  }

  private validateLicense(lic: string): string {
    const licRegex = /^[a-zA-Z0-9]{5}$/;
    return licRegex.test(lic) ? lic : '';
  }
}
