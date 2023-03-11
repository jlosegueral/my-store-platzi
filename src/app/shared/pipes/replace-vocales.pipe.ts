import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceVocales'
})
export class ReplaceVocalesPipe implements PipeTransform {

  transform(value: string): string {

    return value
    .replace(/a/g, '0')
    .replace(/e/g, '1')
    .replace(/i/g, '2')
    .replace(/o/g, '3')
    .replace(/u/g, '4');
  }

}
