import { Asset } from "../types/Asset";

const getNormalizedText = (value?: string | null): string => {
  return typeof value === "string" ? value.trim() : "";
};

export const deriveTemplateTitle = (
  assets: Asset[] | undefined,
  fallback: string = ""
): string => {
  if (!Array.isArray(assets)) {
    return fallback;
  }

  for (const asset of assets) {
    const title = getNormalizedText(asset.data?.title);
    if (title) {
      return title;
    }

    const altText = getNormalizedText(
      (asset.data as { altText?: string }).altText
    );
    if (altText) {
      return altText;
    }
  }

  return fallback;
};

