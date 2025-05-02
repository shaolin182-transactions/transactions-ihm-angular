import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APP_CONFIG } from '../models/app-config';
import { TransactionCategory } from '../models/transaction-category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockConfig = {
    categoriesUrl: '/api/categories',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoryService,
        { provide: APP_CONFIG, useValue: mockConfig }
      ]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should fetch categories', () => {
      const mkCategories: TransactionCategory[] = [
        { id: 1, label: 'Cat A', category: 'Savings' },
        { id: 2, label: 'Cat B', category: 'Checking' },
      ];
  
      service.getCategories().subscribe((categories) => {
        expect(categories.length).toBe(2);
        expect(categories[0].label).toBe('Cat A');
        expect(categories[1].label).toBe('Cat B');
      });
  
      const req = httpMock.expectOne(mockConfig.categoriesUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mkCategories); // Simulate a successful response
    });
  
    it('should map categories correctly', () => {
      const mkCategories: TransactionCategory[] = [
        { id: 1, label: 'Cat A', category: 'Home' },
        { id: 2, label: 'Cat B', category: 'Car' },
      ];
  
      const mappedCategories = service.mapCategories(mkCategories);
      expect(mappedCategories[0].sortedLabel).toBe('Home > Cat A');
      expect(mappedCategories[1].sortedLabel).toBe('Car > Cat B');
    });
});
