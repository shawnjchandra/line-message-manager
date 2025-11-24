import User from "../types/User";
import { authService } from "./auth";
import { FileService } from "./FileService";

export const AccountManagement = {
    async changePassword (users: User[],newPassword:string) : Promise<boolean> {
      const token = authService.getToken();
      if (token) {
        const {email} = token;

        const index = users.findIndex((u) => u.email === email);

        if (index != -1) {
            users[index].password = newPassword;

            const success = await FileService.save("users",users);
            
            if (success) {
                
                return true;
            }
        }

      }
      return false;
    },

    async deleteAccount (users: User[]) {
      const token = authService.getToken();
      if (token) {
        const {email} = token;

        const index = users.findIndex((u) => u.email === email);

        if (index != -1) {
          // users.splice(index,1)
          const remainingUsers = users.filter(u => u.email !== email);

          console.log(remainingUsers);
          await FileService.save("users",remainingUsers);
          authService.logout();
          return true;
        }

      }
      return false;
    }
}
