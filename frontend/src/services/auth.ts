import User from "../types/User";

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
    async saveUsersToFile(users:User[]) : Promise<void> {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'users.json',
                types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
                }]
            });

            const writable = await handle.createWritable();

            await writable.write(JSON.stringify(users,null,2));

            await writable.close();

        } catch (error) {
            console.error('Failed to save file:', error);
        }
    },

    
}

