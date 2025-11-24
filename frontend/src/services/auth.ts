import User from "../types/User";
import { crypto } from "../utils/crypto";
import { FileService } from "../utils/fileService";

declare global {
  interface Window {
    showSaveFilePicker(options?: {
      suggestedName?: string;
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
    }): Promise<FileSystemFileHandle>;
  }
  
  interface FileSystemFileHandle {
    createWritable(): Promise<FileSystemWritableFileStream>;
  }
  
  interface FileSystemWritableFileStream {
    write(data: string): Promise<void>;
    close(): Promise<void>;
  }
}

export const authService = {
    login(email: string , password:string, users: User[] ) : User | null {
      const user = users.find(
        (u: any) => u.email === email  && u.password === password
      ); 
      if(user) {
        const token = {
          id: user.id,
          email: email,
          timestamp:  Date.now()
        }

        const encryptedToken = crypto.encryptObject(token);
        localStorage.setItem("token", encryptedToken);
        
        return user;
      }else {
        return null;
      }
    },

    logout() {
      localStorage.removeItem("token");
    },

    async register(users: User[], email: string, password: string) {
        try {
          let id = 0;
          users.forEach(element => {
            id = id < element.id ? element.id : id;
          });
        
          const newUser:User = {
            id: id,
            email: email,
            password: password
          };
          users.push(newUser)
          
          await FileService.saveToFile(users, "users.json");
        } catch (error) {
            throw new Error("Registration failed");
        }    
    },

    getToken() : { id : number, email: string, timestamp: number}| null {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          return crypto.decryptObject(token);
        } catch (error) {
          console.error('Failed to decrypt token:', error);
          return null;
        }
      } else {
        return null;
      }
    },

    validateToken(): boolean {
      const tokenData = this.getToken();
      
      
      if (tokenData) {
        // Batas 30 menit
        const isExpired = Date.now() - tokenData.timestamp > 30 * 60 * 1000;
        
        console.log("berhasil")
        // Kalau diatas (true), berarti ga valid (false)
        // Dan sebaliknya
        return !isExpired;
      }else {
        console.log("gagal")
        return false;
      }
    },

    getUser(): User | null{
      const token = authService.getToken();
      if (token) {
        return {
          id: token.id,
          email: token.email
        }
      }

      return null;
    }
}

