import User from "../types/User";
import { crypto } from "../utils/crypto";
import { FileService } from "../services/FileService";

type AuthToken = {
  id: number;
  email: string;
  username?: string;
  timestamp: number;
};

const storeToken = (token: AuthToken): void => {
  const encryptedToken = crypto.encryptObject(token);
  localStorage.setItem("token", encryptedToken);
};

export const authService = {
    login(email: string , password:string, users: User[] ) : User | null {
      const user = users.find(
        (u: any) => u.email === email  && u.password === password
      ); 
      if(user) {
        const token: AuthToken = {
          id: user.id ?? 0,
          email: email,
          username: user.username,
          timestamp:  Date.now()
        }

        storeToken(token);
        
        return user;
      }else {
        return null;
      }
    },

    logout() {
      localStorage.removeItem("token");
    },

    async register(users: User[], email: string, password: string, username: string) {
        try {
          const sanitizedUsers = users ?? [];
          const nextId =
            sanitizedUsers.reduce((max, user) => {
              const userId = user.id ?? 0;
              return userId > max ? userId : max;
            }, 0) + 1;
        
          const newUser:User = {
            id: nextId,
            email: email,
            password: password,
            username: username
          };
          sanitizedUsers.push(newUser)
          
          await FileService.save( "users",sanitizedUsers);
        } catch (error) {
            throw new Error("Registration failed");
        }    
    },

    getToken() : AuthToken | null {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          return crypto.decryptObject(token);
        } catch (error) {
          // console.error('Failed to decrypt token:', error);
          return null;
        }
      } else {
        return null;
      }
    },

    updateTokenUser(partial: Partial<AuthToken>) {
      const token = this.getToken();
      if (!token) return;
      const updated: AuthToken = {
        ...token,
        ...partial,
      };
      storeToken(updated);
    },

    validateToken(): boolean {
      const tokenData = this.getToken();
      
      
      if (tokenData) {
        // Batas 30 menit
        const isExpired = Date.now() - tokenData.timestamp > 30 * 60 * 1000;
        
        // console.log("berhasil")
        // Kalau diatas (true), berarti ga valid (false)
        // Dan sebaliknya
        return !isExpired;
      }else {
        // console.log("gagal")
        return false;
      }
    },

    getUser(): User | null{
      const token = authService.getToken();
      if (token) {
        return {
          id: token.id,
          email: token.email,
          username: token.username
        }
      }

      return null;
    }
}

