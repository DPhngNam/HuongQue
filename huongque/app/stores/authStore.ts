import {create} from 'zustand';


interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  initialize: () => void;
  isLogin:()=> boolean;
}


export const useAuthStore = create<AuthState>((set,get)=>({
    accessToken: null,
    refreshToken: null,
    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ accessToken, refreshToken })},
    clearTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null });
    }, 
    initialize: () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        set({ accessToken, refreshToken });
    },
    isLogin:()=>{
        const {accessToken}=get()
        return Boolean(accessToken);
    }
    

}))