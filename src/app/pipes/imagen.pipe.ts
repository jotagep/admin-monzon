import { Pipe, PipeTransform } from '@angular/core';
import { URL_API } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    const url = `${URL_API}/img/${tipo}`;

    if (!img) {
      return url + '/xxx';
    }

    if (img.startsWith('http')) {
      return img;
    }
    return url + '/' + img;
  }

}
