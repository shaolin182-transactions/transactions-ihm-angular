import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportResultComponent } from './import-result.component';
import { IngParsingServiceService } from '../services/ing-parsing-service.service';
import { TransactionItem } from '../models/transaction-item';
import { of } from 'rxjs';

describe('ImportResultComponent', () => {
  let component: ImportResultComponent;
  let fixture: ComponentFixture<ImportResultComponent>;
  let mockIngParsingService: jasmine.SpyObj<IngParsingServiceService>;

  beforeEach(async () => {
    // Créer un mock pour OAuthService
    mockIngParsingService = jasmine.createSpyObj('IngParsingServiceService', [
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
    mockIngParsingService.parse.and.returnValue(of(mockTransaction));

    await TestBed.configureTestingModule({
      declarations: [ ImportResultComponent ],
      providers: [{
        provide: IngParsingServiceService, useValue: mockIngParsingService
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
