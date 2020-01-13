import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from '../interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Animal[], ...args: any[]): any {
    
    // @TODO - refactor this
    if (args[0][0] && args[0][1]) {
      return value
    }
    else if (args[0][0] && !args[0][1]) {
      return value.filter(animal => animal.type == "dog")
    }
    else if (!args[0][0] && args[0][1]) {
      return value.filter(animal => animal.type == "cat")
    }
    else {
      return null
    }
  }

}
