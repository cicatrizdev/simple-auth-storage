class AuthStorage {
	constructor() {
		this.STORAGE_KEY = 'auth_user';
	}

	/**
	 * Generate a secure authentication token
	 * @returns {string} A secure random token
	 */
	generateToken() {
		const array = new Uint8Array(32);
		window.crypto.getRandomValues(array);
		return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
	}

	/**
	 * Save user authentication data to localStorage
	 * @param {Object} user User's data
	 * @param {string} token Authentication token
	 */
	saveUser(user, token) {
		const data = { user, token };
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
	}

	/**
	 * Get the current authenticated user
	 * @returns {Object|null} The authenticated user or null if not logged in
	 */
	getUser() {
		const userData = localStorage.getItem(this.STORAGE_KEY);
		if (!userData) return null;
		return JSON.parse(userData).user;
	}

	/**
	 * Check if a user is currently logged in
	 * @returns {boolean} indicating if user is logged in
	 */
	isLoggedIn() {
		return this.getUser() !== null;
	}

	/**
	 * Remove user authentication data from localStorage
	 */
	logout() {
		localStorage.removeItem(this.STORAGE_KEY);
	}

	/**
	 * Get the current user's email
	 * @returns {string|null} The user's email or null if not logged in
	 */
	getEmail() {
		const user = this.getUser();
		return user ? user.email : null;
	}
}

export default new AuthStorage();
