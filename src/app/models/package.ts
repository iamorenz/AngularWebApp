import { Driver } from "./driver";

export class Package {
  package_id: string;
  package_title: string;
  package_weight: number;
  package_description: string;
  package_destination: string;
  package_createdAt: string;
  package_isAllocated: boolean;
  _id!: string;
  driver_id!: string;

  constructor(
    title: string,
    weight: number,
    destination: string,
    description: string,
    isAllocated: boolean
  ) {
    this.package_id = this.generatePackageId();
    this.package_title = this.validateTitle(title);
    this.package_weight = this.validateWeight(weight);
    this.package_description = this.validateDescription(description);
    this.package_destination = this.validateDestination(destination);
    this.package_createdAt = new Date().toLocaleString();
    this.package_isAllocated = isAllocated ? true : false;
  }

  private generatePackageId(): string {
    const initials = 'GZ';
    const randomUp = this.generateRandomLetters(2);
    const randomNum = Math.floor(Math.random() * 900 + 100);
    return `P${randomUp}-${initials}-${randomNum}`;
  }

  private generateRandomLetters(len: number): string {
    return Array.from({ length: len }, () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    ).join('');
  }

  private validateTitle(title: string): string {
    const titleRegex = /^[a-zA-Z0-9]{3,15}$/;
    return titleRegex.test(title) ? title : '';
  }

  private validateWeight(weight: number): number {
    return weight > 0 ? weight : 0;
  }

  private validateDestination(destination: string): string {
    const desRegex = /^[a-zA-Z0-9]{5,15}$/;
    return desRegex.test(destination) ? destination : '';
  }

  private validateDescription(description: string): string {
    if (
      typeof description === 'string' &&
      description.length > 0 &&
      description.length <= 30
    ) {
      return description;
    } else if (typeof description === 'string' && description.length === 0) {
      return 'No Description Provided';
    } else {
      return '';
    }
  }
}
