import { TestBed } from '@angular/core/testing';
import { ParseFileService } from './parse-file';
import { TransactionItem } from 'src/app/models/transaction-item';
import { IParseAccountLineService } from './i-parse-account-line';

describe('ParseFileService', () => {

    let service: ParseFileService;
    let mockLineParser: jasmine.SpyObj<IParseAccountLineService>;

    beforeEach(() => {
        mockLineParser = jasmine.createSpyObj('IParseAccountLineService', [
            'buildTransaction'
        ]);
        mockLineParser.buildTransaction.and.callFake((line: string) => {
            return { 
                category: null,
                cost: -2299,
                date: new Date(2025, 1, 25),
                description: 'CARTE 22/02 Decathlon France Villeneuve',
                original: null,
                bankAccount: {
                    id: 21,
                    category: 'Commun',
                    label: 'CMB',
                    sortedLabel: 'Commun > CMB'
                } 
            } as TransactionItem; // Mock implementation
        });

        TestBed.configureTestingModule({
            providers: [{
                provide: IParseAccountLineService, useValue: mockLineParser
            }]
        });
        service = TestBed.inject(ParseFileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should parse a file', (done) => {
        const csvFile = '"25/02/2025";"25/02/2025";"CARTE 22/02 Decathlon France Villeneuve ";"22,99";""\n"17/02/2025";"16/02/2025";"CARTE 14/02 CENTER PARCS PARIS CEDEX";"40,00";""\n"13/01/2025";"13/01/2025";"VIR de COMPTE CB PERSO SANDRA -";"";"300,00"\n"31/12/2024";"31/12/2024";"CARTE 30/12 CENTER PARCS PARIS CEDEX";"1034,40";""\n';
        const file = new File([csvFile], 'test.csv', { type: 'text/csv' });

        service.file = file;

        const results: TransactionItem[] = [];
        service.parse(mockLineParser).subscribe({
            next: (item) => results.push(item),
            complete: () => {
                expect(results.length).toBe(4);
                done();
            }
        });
    });

});

