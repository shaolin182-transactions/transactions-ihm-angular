import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { SidenavService } from 'src/app/services/sidenav.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;
  let mockSideNavService: jasmine.SpyObj<SidenavService>;

  beforeEach(async () => {
    mockSideNavService = jasmine.createSpyObj('SidenavService', [
      'toggle',
    ]);

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
      declarations: [ HeaderComponent ],
      providers: [
        { provide: OAuthService, useValue: mockOAuthService }, 
        { provide: SidenavService, useValue: mockSideNavService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
