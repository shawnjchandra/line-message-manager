import { CardAction, ConfirmAction } from './Asset';

export const ASPECT_RATIO_OPTIONS: string[] = ['Rectangle', 'Square'];
export const IMAGE_SIZE_OPTIONS: string[] = ['Cover', 'Contain'];
export const ACTION_OPTIONS: string[] = ['Send Message', 'Open URL', 'Postback'];

export const MAX_ACTION_BUTTONS = 4;
export const CARD_MIN_ACTIONS = 2;
export const CONFIRM_MIN_ACTIONS = 1;

export const createCardAction = (): CardAction => ({
  label: '',
  action: ''
});

export const createConfirmAction = (): ConfirmAction => ({
  label: '',
  action: '',
  message: ''
});

const buildActions = <T>(count: number, factory: () => T): T[] =>
  Array.from({ length: count }, () => factory());

export const DEFAULT_CARD_DATA = {
  imageAspectRatio: '',
  image: null as string | null,
  imageSize: '',
  imageBackgroundColor: '#f58989',
  title: '',
  altText: '',
  description: '',
  actions: buildActions(CARD_MIN_ACTIONS, createCardAction)
};

export const DEFAULT_CONFIRM_DATA = {
  title: '',
  altText: '',
  actions: buildActions(CONFIRM_MIN_ACTIONS, createConfirmAction)
};