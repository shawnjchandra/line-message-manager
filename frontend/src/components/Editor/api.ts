import { Asset, SaveAssetsResponse } from '../../types/Asset';
import { FileService } from '../../services/FileService';
import { authService } from '../../services/auth';

// // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// export const saveAssets = async (assets: Asset[]): Promise<SaveAssetsResponse> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/assets`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ assets }),
//     });
//     const user = authService.getToken()
//     if (user) {
      
//       const response = await FileService.save("assets",assets)
  
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save assets');
//       }
  
//       return await response.json();

//     } else {
//       throw new Error("");
//     }

//   } catch (error) {
//     console.error('Error saving assets:', error);
//     throw error;
//   }
// };

// export const getAssets = async (): Promise<Asset[]> => {
//   try {
//     // const response = await fetch(`${API_BASE_URL}/assets`);
//     const response = await FileService.load<>("assets");

//     // if (!response.ok) {
//     //   throw new Error('Failed to fetch assets');
//     // }

//     const data = await response.json();
//     return data.assets || [];
//   } catch (error) {
//     console.error('Error fetching assets:', error);
//     throw error;
//   }
// };

// export const deleteAsset = async (id: string): Promise<void> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete asset');
//     }
//   } catch (error) {
//     console.error('Error deleting asset:', error);
//     throw error;
//   }
// };

// export const uploadImage = async (file: File): Promise<string> => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);

//     const response = await fetch(`${API_BASE_URL}/upload`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to upload image');
//     }

//     const data = await response.json();
//     return data.url;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// };