export const ASPECT_RATIO_OPTIONS: string[] = ['Rectangle', 'Square'];
export const IMAGE_SIZE_OPTIONS: string[] = ['Cover', 'Contain'];
export const ACTION_OPTIONS: string[] = ['Send Message', 'Open URL', 'Postback'];

export const DEFAULT_CARD_DATA = {
  imageAspectRatio: '',
  image: null as string | null,
  imageSize: '',
  imageBackgroundColor: '#f58989',
  title: '',
  altText: '',
  description: '',
  defaultAction: {
    label: '',
    action: ''
  }
};

export const DEFAULT_CONFIRM_DATA = {
  title: '',
  altText: '',
  actionButton1: {
    label: '',
    action: '',
    message: ''
  },
  actionButton2: {
    label: '',
    action: '',
    message: ''
  }
};