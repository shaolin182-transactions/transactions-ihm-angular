import { Injectable } from '@angular/core';
import { TransactionEditComponent } from '../shared/component/transaction-edit/transaction-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {

  private form: TransactionEditComponent;

  public setForm(form: TransactionEditComponent) {
    this.form = form;
  }

  public open() {
      return this.form.openFn();
  }


  public close() {
      return this.form.closeFn();
  }
}
