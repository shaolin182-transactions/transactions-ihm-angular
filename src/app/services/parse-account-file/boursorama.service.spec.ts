import { TestBed } from '@angular/core/testing';

import { BoursoramaLineParserService } from './boursorama.service';
import { BankAccount } from 'src/app/models/bank-account';

describe('BoursoramaService', () => {
  let service: BoursoramaLineParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoursoramaLineParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should parse a line with success', () => {
    const lineFromCSVFile = '2025-06-16;2025-06-16;"CARTE 13/06/25 LE TEMPLE DU JE03 CB*8541";"Non catégorisé";"Non catégorisé";;-45,00;;00040025329;BoursoBank;1259.39';

    const result = service.buildTransaction(lineFromCSVFile);
    
    expect(result.bankAccount).toEqual({
      id : 37,
      category : "Perso",
      label: "Boursorama",
      sortedLabel: "Perso > Boursorama"
    } as BankAccount);

    expect(result.cost).toBe(-4500);
    expect(result.description).toEqual('CARTE 13/06/25 LE TEMPLE DU JE03 CB8541');
    expect(result.date).toEqual(new Date(2025, 5, 16));
    expect(result.category).toBeNull();
    expect(result).toBeTruthy();
  })
});
