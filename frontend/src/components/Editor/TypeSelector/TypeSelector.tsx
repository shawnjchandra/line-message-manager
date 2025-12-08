import React from 'react';
import { useTranslation } from 'react-i18next';

interface TypeSelectorProps {
  onSelectType: (type: 'card' | 'confirm') => void;
  onCancel: () => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ onSelectType, onCancel }) => {
  const { t } = useTranslation();
  return (
    <div className="type-selector-overlay" onClick={onCancel}>
      <div className="type-selector-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="type-selector-title">{t('editor.selectAssetType')}</h3>
        <div className="type-selector-buttons">
          <button
            className="type-selector-button"
            onClick={() => onSelectType('card')}
            type="button"
          >
            {t('editor.card')}
          </button>
          <button
            className="type-selector-button"
            onClick={() => onSelectType('confirm')}
            type="button"
          >
            {t('editor.confirm')}
          </button>
        </div>
        <button 
          className="type-selector-cancel" 
          onClick={onCancel}
          type="button"
        >
          {t('editor.cancel')}
        </button>
      </div>
    </div>
  );
};

export default TypeSelector;