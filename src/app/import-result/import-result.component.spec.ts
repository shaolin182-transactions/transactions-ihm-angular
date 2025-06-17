import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportResultComponent } from './import-result.component';
import { TransactionItem } from '../models/transaction-item';
import { of } from 'rxjs';
import { ParseFileService } from '../services/parse-account-file/parse-file';

describe('ImportResultComponent', () => {
  let component: ImportResultComponent;
  let fixture: ComponentFixture<ImportResultComponent>;
  let mockParsingService: jasmine.SpyObj<ParseFileService>;

  beforeEach(async () => {
    // Créer un mock pour OAuthService
    mockParsingService = jasmine.createSpyObj('ParseFileService', [
      'parse'
    ]);

    // Configurer la méthode parse pour retourner un Observable simulé
    const mockTransaction: TransactionItem = {
      original: null,
      date: new Date('2025-05-02'),
      cost: 10000,
      description: 'Test Transaction',
      bankAccount: {
        id: 1,
        category: 'Test Category',
        label: 'Test Bank',
        sortedLabel: 'Test Category > Test Bank',
      },
      category: null,
    };
    mockParsingService.parse.and.returnValue(of(mockTransaction));

    await TestBed.configureTestingModule({
      declarations: [ ImportResultComponent ],
      providers: [{
        provide: ParseFileService, useValue: mockParsingService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
