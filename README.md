# Simple Auth Storage

Um pacote simples para gerenciar autenticação de usuários usando localStorage.

## Instalação

```bash
npm install simple-auth-storage
```

## Uso

```javascript
import authStorage from 'simple-auth-storage';

// Gerar um token de autenticação
const token = authStorage.generateToken();

// Salvar usuário com o token gerado
authStorage.saveUser({ email: 'usuario@email.com' }, token);

// Verificar se está logado
const isLoggedIn = authStorage.isLoggedIn();

// Obter email do usuário
const email = authStorage.getEmail();

// Fazer logout
authStorage.logout();
```

## Métodos Disponíveis

- `generateToken()`: Gera um token de autenticação seguro usando criptografia
- `saveUser(user, token)`: Salva os dados do usuário no localStorage
- `getUser()`: Retorna os dados do usuário atual ou null se não estiver logado
- `isLoggedIn()`: Retorna true se o usuário estiver logado
- `logout()`: Remove os dados do usuário do localStorage
- `getEmail()`: Retorna o email do usuário atual ou null se não estiver logado
