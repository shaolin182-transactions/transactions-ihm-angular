import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { OAuthService } from 'angular-oauth2-oidc';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;

  beforeEach(async () => {
    // Créer un mock pour OAuthService
    mockOAuthService = jasmine.createSpyObj('OAuthService', [
      'getIdentityClaims',
      'getIdToken',
      'getAccessToken',
    ]);

    // Configurer les valeurs retournées par les méthodes mockées
    mockOAuthService.getIdentityClaims.and.returnValue({ given_name: 'John' });
    mockOAuthService.getIdToken.and.returnValue('mock-id-token');
    mockOAuthService.getAccessToken.and.returnValue('mock-access-token');

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: OAuthService, useValue: mockOAuthService }, // Fournir le mock
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
