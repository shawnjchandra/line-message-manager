import React from 'react';
import { X, ChevronDown, ChevronRight, ChevronUp, Plus } from 'lucide-react';
import { Asset } from '../../../types/Asset';
import CardForm from '../Form/CardForm';
import ConfirmForm from '../Form/ConfirmForm';
import { useTranslation } from 'react-i18next';

interface AssetItemProps {
  asset: Asset;
  index: number;
  totalAssets: number;
  onToggleExpand: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdate: (path: string, value: any) => void;
  onAddBelow: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const AssetItem: React.FC<AssetItemProps> = ({
  asset,
  index,
  totalAssets,
  onToggleExpand,
  onDelete,
  onMoveUp,
  onMoveDown,
  onUpdate,
  onAddBelow,
  onImageUpload,
  onRemoveImage
}) => {
  const { t } = useTranslation();
  return (
    <div className="asset-item">
      <div className="asset-header">
        <button 
          className="asset-expand-btn" 
          onClick={onToggleExpand}
          type="button"
        >
          {asset.expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          <span className="asset-title">
            {`${t('editor.asset')} ${index + 1} - ${asset.type === 'card' ? t('editor.card') : t('editor.confirm')}`}
          </span>
        </button>

        <div className="asset-actions">
          <button
            className="asset-action-btn"
            onClick={onMoveUp}
            disabled={index === 0}
            title={t('editor.moveUp')}
            type="button"
          >
            <ChevronUp size={18} />
          </button>
          <button
            className="asset-action-btn"
            onClick={onMoveDown}
            disabled={index === totalAssets - 1}
            title={t('editor.moveDown')}
            type="button"
          >
            <ChevronDown size={18} />
          </button>
          <button
            className="asset-action-btn asset-delete-btn"
            onClick={onDelete}
            title={t('editor.delete')}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {asset.expanded && (
        <div className="asset-body">
          {asset.type === 'card' ? (
            <CardForm
              asset={asset}
              onUpdate={onUpdate}
              onImageUpload={onImageUpload}
              onRemoveImage={onRemoveImage}
            />
          ) : (
            <ConfirmForm
              asset={asset}
              onUpdate={onUpdate}
            />
          )}

          <button 
            className="add-asset-below-btn" 
            onClick={onAddBelow}
            type="button"
          >
            <Plus size={18} />
            <span>{t('editor.addAssetBelow')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetItem;