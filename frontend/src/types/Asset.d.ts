export interface CardAction {
  label: string;
  action: string;
}

export interface ConfirmAction {
  label: string;
  action: string;
  message: string;
}

export interface CardAsset {
  id: string;
  type: 'card';
  expanded: boolean;
  data: {
    imageAspectRatio: string;
    image: string | null;
    imageSize: string;
    imageBackgroundColor: string;
    title: string;
    altText: string;
    description: string;
    actions: CardAction[];
  };
}

export interface ConfirmAsset {
  id: string;
  type: 'confirm';
  expanded: boolean;
  data: {
    title: string;
    altText: string;
    actions: ConfirmAction[];
  };
}

export type Asset = CardAsset | ConfirmAsset;

export interface SaveAssetsResponse {
  success: boolean;
  message: string;
  data?: Asset[];
}