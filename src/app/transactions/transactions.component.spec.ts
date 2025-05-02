import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsComponent } from './transactions.component';
import { TransactionsService } from '../services/transactions.service';
import { AlertifyService } from '../services/alertify.service';
import { of } from 'rxjs';

describe('TransactionslistComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionsService>;
  let mkAlertifyService: jasmine.SpyObj<AlertifyService>;

  beforeEach(async () => {

    mockTransactionService = jasmine.createSpyObj('TransactionsService', [
      'getTransactions'
    ]);

    mockTransactionService.getTransactions.and.returnValue(of([]));
    
    await TestBed.configureTestingModule({
      declarations: [ TransactionsComponent ],
      providers: [
        { provide: TransactionsService, useValue: mockTransactionService },
        { provide: AlertifyService, useValue: mkAlertifyService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
