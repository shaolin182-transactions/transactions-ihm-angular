import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionsListComponent } from './transactions-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditFormService } from 'src/app/services/edit-form.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { TransactionEditComponent } from '../transaction-edit/transaction-edit.component';

// Mock du composant TransactionEditComponent
@Component({
  selector: 'app-transaction-edit',
  template: ''
})
class MockTransactionEditComponent {
  openFn() {}
  closeFn() {}
}

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let mockEditFormService: jasmine.SpyObj<EditFormService>;

  beforeEach(async () => {
    // Création d'un mock pour EditFormService
    mockEditFormService = jasmine.createSpyObj('EditFormService', ['setForm', 'open']);
    mockEditFormService.setForm.and.returnValue(undefined);
    mockEditFormService.open.and.returnValue(undefined);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        HttpClientTestingModule // Fournit HttpClient pour les tests
      ],
      declarations: [TransactionsListComponent, MockTransactionEditComponent], // Ajout du mock
      providers: [
        { provide: EditFormService, useValue: mockEditFormService } // Fournir le mock du service
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    component.editFormDom = TestBed.createComponent(MockTransactionEditComponent).componentInstance as TransactionEditComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});