import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FbmethodsService {

  constructor(
    private fb: FormBuilder
  ) { }

  updateValue(control, object): void { // Сделать более универсальным, т.е для любого вида фб
    var baseControl = control['controls'];
    for (let q in baseControl) {
      for (let w in object) {
        if (q === w) {
          baseControl[q].setValue(object[w]);
        }
      }
    }

  }
  
}
