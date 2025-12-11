
const API_URL = process.env.REACT_APP_API_URL;

export const FileService = {

  // Load ANY file by name
  // Usage: await FileService.load<User[]>("users")
  async load<T>(filename: string): Promise<T | null> {
    try {
      const response = await fetch(`${API_URL}/data/${filename}`);

      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      return await response.json();
    }
     catch (error) {
      // console.error(`Error loading ${filename}:`, error);
      return null;
    }
  },

  // Save ANY file by name
  // Usage: await FileService.save("users", userArray)
  async save<T>(filename: string, data: T): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/save/${filename}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.ok;
    } catch (error) {
      // console.error(`Error saving ${filename}:`, error);
      return false;
    }
  }
};