import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class SubstringPipe implements PipeTransform {

  transform(value: any, args?: any,args1?:number): any {
    return value.userDetails.orderid?.toString().substr(args, args1);
  }

}
