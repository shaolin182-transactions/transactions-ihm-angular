import { TestBed } from '@angular/core/testing';

import { CmbLineParserService } from './cmb.service';
import { BankAccount } from 'src/app/models/bank-account';

describe('CmbService', () => {
  let service: CmbLineParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmbLineParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should parse a line with success', () => {
    const lineFromCSVFile = '"25/02/2025";"25/02/2025";"CARTE 22/02 Decathlon France Villeneuve";"22,99";""';

    const result = service.buildTransaction(lineFromCSVFile);
    
    expect(result.bankAccount).toEqual({
            id : 21,
            category : "Commun",
            label: "CMB",
            sortedLabel: "Commun > CMB"
          } as BankAccount);

    expect(result.cost).toBe(-2299);
    expect(result.description).toEqual('CARTE 22/02 Decathlon France Villeneuve');
    expect(result.date).toEqual(new Date(2025, 1, 25));
    expect(result.category).toBeNull();
    expect(result).toBeTruthy();
  })
});
