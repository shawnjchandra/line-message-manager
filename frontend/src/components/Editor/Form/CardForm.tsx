import React from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { CardAsset } from '../../../types/Asset';
import { useTranslation } from 'react-i18next';
import {
  ACTION_OPTIONS,
  ASPECT_RATIO_OPTIONS,
  CARD_MIN_ACTIONS,
  IMAGE_SIZE_OPTIONS,
  MAX_ACTION_BUTTONS,
  createCardAction
} from '../../../types/constants';

interface CardFormProps {
  asset: CardAsset;
  onUpdate: (path: string, value: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ asset, onUpdate, onImageUpload, onRemoveImage }) => {
  const { t } = useTranslation();
  const actions = Array.isArray(asset.data.actions) ? asset.data.actions : [];
  const canAddAction = actions.length < MAX_ACTION_BUTTONS;

  const handleRemoveAction = (index: number) => {
    if (actions.length <= CARD_MIN_ACTIONS) return;
    const updated = actions.filter((_, i) => i !== index);
    onUpdate('data.actions', updated);
  };

  const handleAddAction = () => {
    if (!canAddAction) return;
    onUpdate('data.actions', [...actions, createCardAction()]);
  };

  return (
    <div className="asset-form">
  
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">{t('form.uploadImage')}</label>
          <div className="image-upload-container">
            {asset.data.image ? (
              <div 
                className="image-preview"
                style={{ backgroundColor: asset.data.imageBackgroundColor || '#e9ecef' }}
              >
                <img 
                  src={asset.data.image} 
                  alt="Preview" 
                />
                <button 
                  className="image-remove-btn" 
                  onClick={onRemoveImage}
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="image-upload-label">
                <Upload size={24} />
                <span>{t('form.clickToUpload')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="image-upload-input"
                />
              </label>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t('form.imageSize')}</label>
          <select
            value={asset.data.imageSize || 'NULL'}
            onChange={(e) => onUpdate('data.imageSize', e.target.value)}
            className="form-select"
          >
            {/* <option value="">{t('form.selectSize')}</option> */}
            {IMAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label className="form-label" style={{ marginTop: '1rem' }}>{t('form.imageBackgroundColor')}</label>
          <div className="color-input-wrapper">
            <input
              type="text"
              value={asset.data.imageBackgroundColor}
              onChange={(e) => onUpdate('data.imageBackgroundColor', e.target.value)}
              className="form-input"
              placeholder="#f58989"
            />
            <input
              type="color"
              value={asset.data.imageBackgroundColor}
              onChange={(e) => onUpdate('data.imageBackgroundColor', e.target.value)}
              className="color-picker"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          {t('form.titleForm')} <span className="required">*</span>
        </label>
        <input
          type="text"
          value={asset.data.title}
          onChange={(e) => onUpdate('data.title', e.target.value)}
          className="form-input"
          placeholder={t('form.enterTitleForm')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          {t('form.altText')} <span className="required">*</span>
        </label>
        <input
          type="text"
          value={asset.data.altText}
          onChange={(e) => onUpdate('data.altText', e.target.value)}
          className="form-input"
          placeholder={t('form.enterAltText')}
        />
      </div>

      <div className="form-group">
        <label className="form-label">{t('form.description')}</label>
        <textarea
          value={asset.data.description}
          onChange={(e) => onUpdate('data.description', e.target.value)}
          className="form-textarea"
          placeholder={t('form.enterDescription')}
          rows={3}
        />
      </div>

      <div className="default-action-section">
        <div className="action-section-header">
          <h4 className="section-subtitle">{t('form.cardActionsTitle', 'Action Buttons')}</h4>
        </div>

        {actions.map((action, index) => (
          <div key={`card-action-${index}`} className="action-button-section">
            <div className="action-section-header">
              <h5 className="section-subtitle">
                {t('form.actionButtonDynamic', { index: index + 1 })}
              </h5>

              {actions.length > CARD_MIN_ACTIONS && (
                <button
                  type="button"
                  className="action-remove-btn"
                  onClick={() => handleRemoveAction(index)}
                >
                  <X size={14} />
                  <span>{t('form.removeActionButton')}</span>
                </button>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('form.label')}</label>
                <input
                  type="text"
                  value={action.label}
                  onChange={(e) => onUpdate(`data.actions.${index}.label`, e.target.value)}
                  className="form-input"
                  placeholder={t('form.enterLabel')}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('form.action')}</label>
                <select
                  value={action.action}
                  onChange={(e) => onUpdate(`data.actions.${index}.action`, e.target.value)}
                  className="form-select"
                >
                  <option value="">{t('form.selectAction')}</option>
                  {ACTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        <div className="action-buttons-footer">
          <button
            type="button"
            className="action-add-btn"
            onClick={handleAddAction}
            disabled={!canAddAction}
          >
            <Plus size={16} />
            <span>{t('form.addActionButton')}</span>
          </button>
          <span className="action-limit-text">
            {t('form.actionButtonCount', {
              count: actions.length,
              max: MAX_ACTION_BUTTONS
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardForm;