import User from "../types/User";
import { FileService } from "../utils/fileService";
import { authService } from "./auth";

export const AccountManagement = {
    async changePassword (users: User[],newPassword:string) : Promise<boolean> {
      const token = authService.getToken();
      if (token) {
        const {email} = token;

        const index = users.findIndex((u) => u.email === email);

        if (index != -1) {
            users[index].password = newPassword;

            const success = await FileService.saveToFile(users, "users");
            
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
          await FileService.saveToFile(remainingUsers,"users");
          authService.logout();
          return true;
        }

      }
      return false;
    }
}
