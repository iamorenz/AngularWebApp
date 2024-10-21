import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeWeightUnit',
  standalone: true,
})
export class ChangeWeightUnitPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return 'Invalid Weight';
    }

    const grams = value * 1000;
    return `${grams.toFixed(2)} g`;
  }
}
