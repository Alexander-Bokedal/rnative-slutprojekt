import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AuthState {
	user: User | null;
	isLoggedIn: boolean;
	setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isLoggedIn: false,
	setUser: (user: User | null) => {
		set({
			user: user,
			isLoggedIn: !!user
		});
	},
}));
