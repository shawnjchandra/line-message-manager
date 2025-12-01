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
    defaultAction: {
      label: string;
      action: string;
    };
  };
}

export interface ConfirmAsset {
  id: string;
  type: 'confirm';
  expanded: boolean;
  data: {
    title: string;
    altText: string;
    actionButton1: {
      label: string;
      action: string;
      message: string;
    };
    actionButton2: {
      label: string;
      action: string;
      message: string;
    };
  };
}

export type Asset = CardAsset | ConfirmAsset;

export interface SaveAssetsResponse {
  success: boolean;
  message: string;
  data?: Asset[];
}