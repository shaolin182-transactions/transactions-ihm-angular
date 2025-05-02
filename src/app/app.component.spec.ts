import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { APP_CONFIG } from './models/app-config';

describe('AppComponent', () => {

  let mockOAuthService: jasmine.SpyObj<OAuthService>;

  const mockConfig = {
    keyCloakUrl: '/keycloak',
    redirectUri: 'http://localhost:8080',
    discoveryUrl: '/auth/realms/transactions/.well-known/openid-configuration',
  };

  beforeEach(async () => {
    mockOAuthService = jasmine.createSpyObj('OAuthService', [
      'configure',
      'loadDiscoveryDocument',
      'tryLogin',
    ]);

    // Configurer les valeurs retournées par les méthodes mockées
    mockOAuthService.configure.and.callFake;
    mockOAuthService.loadDiscoveryDocument.and.returnValue(Promise.resolve({ type: 'discovery_document_loaded' , info: {}}));
    mockOAuthService.tryLogin.and.callFake;
    
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: OAuthService, useValue: mockOAuthService }, 
        { provide: APP_CONFIG, useValue: mockConfig }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'transactions-ihm-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('transactions-ihm-angular');
  });
});
