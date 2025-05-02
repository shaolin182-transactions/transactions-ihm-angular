import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BankAccountService } from './bank-account.service';
import { APP_CONFIG } from '../models/app-config';
import { BankAccount } from '../models/bank-account';

describe('BankAccountService', () => {
  let service: BankAccountService;
  let httpMock: HttpTestingController;

  const mockConfig = {
    bankAccountUrl: '/api/bank-accounts',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BankAccountService,
        { provide: APP_CONFIG, useValue: mockConfig }
      ],
    });
    service = TestBed.inject(BankAccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch bank accounts', () => {
    const mkAccounts: BankAccount[] = [
      { id: 1, label: 'Account A', category: 'Savings' },
      { id: 2, label: 'Account B', category: 'Checking' },
    ];

    service.getBankAccounts().subscribe((accounts) => {
      expect(accounts.length).toBe(2);
      expect(accounts[0].label).toBe('Account A');
      expect(accounts[1].label).toBe('Account B');
    });

    const req = httpMock.expectOne(mockConfig.bankAccountUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mkAccounts); // Simulate a successful response
  });

  it('should map bank accounts correctly', () => {
    const mockBankAccounts: BankAccount[] = [
      { id: 1, label: 'Account A', category: 'Savings' },
      { id: 2, label: 'Account B', category: 'Checking' },
    ];

    const mappedAccounts = service.mapBankAccounts(mockBankAccounts);
    expect(mappedAccounts[0].sortedLabel).toBe('Savings > Account A');
    expect(mappedAccounts[1].sortedLabel).toBe('Checking > Account B');
  });
});
