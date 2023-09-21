import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //This method is used for filter the product data based on input
  transform(product:Product[],searchValue:any): Product[] {
    if(!product ||! searchValue)
    {
    return product
    }
    return product.filter(product=>product.subject.toLowerCase().includes(searchValue.toLowerCase())
    ||product.messageBody.toLowerCase().includes(searchValue.toLowerCase())||
    product.question.toLowerCase().includes(searchValue.toLowerCase())  || product.date.toLowerCase().includes(searchValue.toLowerCase())
    || product.userName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

}
