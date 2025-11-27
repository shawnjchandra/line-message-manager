import { Asset, CardAsset, ConfirmAsset } from '../types/Asset';
import { DEFAULT_CARD_DATA, DEFAULT_CONFIRM_DATA } from '../types/constants';

export const createNewAsset = (type: 'card' | 'confirm'): Asset => {
  const id = `asset-${Date.now()}-${Math.random()}`;
  
  if (type === 'card') {
    const asset: CardAsset = {
      id,
      type: 'card',
      expanded: true,
      data: { ...DEFAULT_CARD_DATA }
    };
    return asset;
  } else {
    const asset: ConfirmAsset = {
      id,
      type: 'confirm',
      expanded: true,
      data: { ...DEFAULT_CONFIRM_DATA }
    };
    return asset;
  }
};

export const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const newObj = JSON.parse(JSON.stringify(obj));
  let current: any = newObj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return newObj;
};

export const validateAsset = (asset: Asset): string[] => {
  const errors: string[] = [];

  if (!asset.data.channel) {
    errors.push('Channel is required');
  }

  if (asset.type === 'card') {
    const cardAsset = asset as CardAsset;
    if (!cardAsset.data.title) errors.push('Title is required');
    if (!cardAsset.data.altText) errors.push('Alt Text is required');
  } else {
    const confirmAsset = asset as ConfirmAsset;
    if (!confirmAsset.data.title) errors.push('Title is required');
    if (!confirmAsset.data.altText) errors.push('Alt Text is required');
  }

  return errors;
};

export const validateAllAssets = (assets: Asset[]): boolean => {
  if (assets.length === 0) return false;
  return assets.every((asset) => validateAsset(asset).length === 0);
};