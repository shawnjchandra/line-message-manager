import { Asset, CardAction, CardAsset, ConfirmAction, ConfirmAsset } from '../types/Asset';
import {
  CARD_MIN_ACTIONS,
  CONFIRM_MIN_ACTIONS,
  DEFAULT_CARD_DATA,
  DEFAULT_CONFIRM_DATA,
  MAX_ACTION_BUTTONS,
  createCardAction,
  createConfirmAction
} from '../types/constants';

const cloneCardData = (): CardAsset['data'] => ({
  ...DEFAULT_CARD_DATA,
  actions: Array.from({ length: CARD_MIN_ACTIONS }, () => createCardAction())
});

const cloneConfirmData = (): ConfirmAsset['data'] => ({
  ...DEFAULT_CONFIRM_DATA,
  actions: Array.from({ length: CONFIRM_MIN_ACTIONS }, () => createConfirmAction())
});

const sanitizeCardAction = (action?: Partial<CardAction>): CardAction => ({
  label: action?.label ?? '',
  action: action?.action ?? ''
});

const sanitizeConfirmAction = (action?: Partial<ConfirmAction>): ConfirmAction => ({
  label: action?.label ?? '',
  action: action?.action ?? '',
  message: action?.message ?? ''
});

const normalizeCardAsset = (asset: CardAsset): CardAsset => {
  const rawActions: Partial<CardAction>[] = Array.isArray(asset.data.actions)
    ? [...asset.data.actions]
    : [];

  if (!rawActions.length && (asset.data as any).defaultAction) {
    rawActions.push((asset.data as any).defaultAction);
  }

  const sanitized = rawActions
    .filter(Boolean)
    .map((action) => sanitizeCardAction(action));

  const limited = sanitized.slice(0, MAX_ACTION_BUTTONS);
  while (limited.length < CARD_MIN_ACTIONS) {
    limited.push(createCardAction());
  }

  return {
    ...asset,
    data: {
      ...asset.data,
      actions: limited
    }
  };
};

const normalizeConfirmAsset = (asset: ConfirmAsset): ConfirmAsset => {
  const rawActions: Partial<ConfirmAction>[] = Array.isArray(asset.data.actions)
    ? [...asset.data.actions]
    : [];

  if (!rawActions.length) {
    const legacyActions = [
      (asset.data as any).actionButton1,
      (asset.data as any).actionButton2
    ].filter(Boolean);
    rawActions.push(...legacyActions);
  }

  const sanitized = rawActions
    .filter(Boolean)
    .map((action) => sanitizeConfirmAction(action));

  const limited = sanitized.slice(0, MAX_ACTION_BUTTONS);
  while (limited.length < CONFIRM_MIN_ACTIONS) {
    limited.push(createConfirmAction());
  }

  return {
    ...asset,
    data: {
      ...asset.data,
      actions: limited
    }
  };
};

export const normalizeAssets = (assets: Asset[]): Asset[] =>
  assets.map((asset) => {
    if (asset.type === 'card') {
      return normalizeCardAsset(asset as CardAsset);
    }
    return normalizeConfirmAsset(asset as ConfirmAsset);
  });

export const createNewAsset = (type: 'card' | 'confirm'): Asset => {
  const id = `asset-${Date.now()}-${Math.random()}`;
  
  if (type === 'card') {
    return normalizeCardAsset({
      id,
      type: 'card',
      expanded: true,
      data: cloneCardData()
    } as CardAsset);
  } else {
    return normalizeConfirmAsset({
      id,
      type: 'confirm',
      expanded: true,
      data: cloneConfirmData()
    } as ConfirmAsset);
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
  console.log(assets.length);
  if (assets.length === 0) return false;
  return assets.every((asset) => validateAsset(asset).length === 0);
};