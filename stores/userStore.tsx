import { create } from 'zustand';


interface User {
	user: boolean,
	toggleLogin: () => void,
}


const useUserState = create<User>()((set) => ({
	user: false,
	toggleLogin: () => set((state) => ({ user: !state.user }))
}))

export default useUserState
