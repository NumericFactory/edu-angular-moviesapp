import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext'
})
export class CuttextPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(0, 100) + '...';
  }
}
