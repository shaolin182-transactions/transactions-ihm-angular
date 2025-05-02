import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionEditComponent } from './transaction-edit.component';
import { CategoryService } from 'src/app/services/category.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { from } from 'rxjs';

describe('TransactionEditComponent', () => {
  let component: TransactionEditComponent;
  let fixture: ComponentFixture<TransactionEditComponent>;
  let mkCatService: jasmine.SpyObj<CategoryService>;
  let mkBkService: jasmine.SpyObj<BankAccountService>;
  let mkTransactionService: jasmine.SpyObj<TransactionsService>;
  let mkAlertifyService: jasmine.SpyObj<AlertifyService>;

  beforeEach(async () => {
    mkCatService = jasmine.createSpyObj('CategoryService', [
      'getCategories'
    ]);
    mkBkService = jasmine.createSpyObj('BankAccountService', [
      'getBankAccounts'
    ]);
    mkCatService.getCategories.and.returnValue(from(Promise.resolve([{ id: 1, label: "label", category: "Cat" }])));
    mkBkService.getBankAccounts.and.returnValue(from(Promise.resolve([{ id: 1, label: "label", category: "Cat" }])));
    await TestBed.configureTestingModule({
      declarations: [ TransactionEditComponent ],
      providers: [
        { provide: CategoryService, useValue: mkCatService },
        { provide: BankAccountService, useValue: mkBkService },
        { provide: TransactionsService, useValue: mkTransactionService },
        { provide: AlertifyService, useValue: mkAlertifyService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
