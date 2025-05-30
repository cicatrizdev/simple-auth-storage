import authStorage from './index';

// Mock do localStorage
const localStorageMock = (() => {
	let store = {};
	return {
		getItem: jest.fn((key) => store[key]),
		setItem: jest.fn((key, value) => {
			store[key] = value;
		}),
		removeItem: jest.fn((key) => {
			delete store[key];
		}),
		clear: () => {
			store = {};
		},
	};
})();

// Mock do window.crypto
const cryptoMock = {
	getRandomValues: jest.fn((array) => {
		for (let i = 0; i < array.length; i++) {
			array[i] = Math.floor(Math.random() * 256);
		}
		return array;
	}),
};

// Configuração dos mocks
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'crypto', { value: cryptoMock });

describe('AuthStorage', () => {
	beforeEach(() => {
		// Limpa o localStorage antes de cada teste
		localStorage.clear();
		// Limpa todos os mocks
		jest.clearAllMocks();
	});

	describe('generateToken', () => {
		it('deve gerar um token de 64 caracteres', () => {
			const token = authStorage.generateToken();
			expect(token.length).toBe(64);
			expect(cryptoMock.getRandomValues).toHaveBeenCalled();
		});

		it('deve gerar tokens diferentes a cada chamada', () => {
			const token1 = authStorage.generateToken();
			const token2 = authStorage.generateToken();
			expect(token1).not.toBe(token2);
		});
	});

	describe('saveUser', () => {
		it('deve salvar usuário no localStorage', () => {
			const user = { email: 'test@example.com' };
			const token = 'test-token';

			authStorage.saveUser(user, token);

			expect(localStorage.setItem).toHaveBeenCalledWith(
				'auth_user',
				JSON.stringify({ user, token })
			);
		});
	});

	describe('getUser', () => {
		it('deve retornar null quando não há usuário salvo', () => {
			expect(authStorage.getUser()).toBeNull();
		});

		it('deve retornar os dados do usuário quando existe', () => {
			const userData = { user: { email: 'test@example.com' }, token: 'test-token' };
			localStorage.setItem('auth_user', JSON.stringify(userData));

			expect(authStorage.getUser()).toEqual(userData.user);
		});
	});

	describe('isLoggedIn', () => {
		it('deve retornar false quando não há usuário logado', () => {
			expect(authStorage.isLoggedIn()).toBe(false);
		});

		it('deve retornar true quando há usuário logado', () => {
			const userData = { user: { email: 'test@example.com' }, token: 'test-token' };
			localStorage.setItem('auth_user', JSON.stringify(userData));

			expect(authStorage.isLoggedIn()).toBe(true);
		});
	});

	describe('logout', () => {
		it('deve remover usuário do localStorage', () => {
			const userData = { user: { email: 'test@example.com' }, token: 'test-token' };
			localStorage.setItem('auth_user', JSON.stringify(userData));

			authStorage.logout();

			expect(localStorage.removeItem).toHaveBeenCalledWith('auth_user');
			expect(authStorage.getUser()).toBeNull();
		});
	});

	describe('getEmail', () => {
		it('deve retornar null quando não há usuário logado', () => {
			expect(authStorage.getEmail()).toBeNull();
		});

		it('deve retornar o email do usuário logado', () => {
			const email = 'test@example.com';
			const userData = { user: { email }, token: 'test-token' };
			localStorage.setItem('auth_user', JSON.stringify(userData));

			expect(authStorage.getEmail()).toBe(email);
		});
	});
});
