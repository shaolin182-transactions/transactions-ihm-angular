export const environment = {
  production: true, 

  transactionsUrl: 'http://transactions-server:8080/transactions',
  transactionsUrlGet: 'http://transactions-server:8080/transactions',
  keyCloakUrl: 'http://keycloak:8082/auth/realms/transactions',
  discoveryUrl: 'http://keycloak:8082/auth/realms/transactions/.well-known/openid-configuration',
  categoriesUrl: 'assets/categories.json',
  bankAccountUrl: 'assets/bankAccount.json'
};
