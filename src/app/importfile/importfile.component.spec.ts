import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportfileComponent } from './importfile.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ImportfileComponent', () => {
  let component: ImportfileComponent;
  let fixture: ComponentFixture<ImportfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportfileComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
