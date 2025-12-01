import React from 'react';
import { X, Upload } from 'lucide-react';
import { CardAsset } from '../../../types/Asset';
import { useTranslation } from 'react-i18next';
import {ASPECT_RATIO_OPTIONS, IMAGE_SIZE_OPTIONS, ACTION_OPTIONS } from '../../../types/constants';

interface CardFormProps {
  asset: CardAsset;
  onUpdate: (path: string, value: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ asset, onUpdate, onImageUpload, onRemoveImage }) => {
  const { t } = useTranslation();

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
                  className={imageSizeClass} 
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
            <option value="">{t('form.selectSize')}</option>
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
          {t('form.title')} <span className="required">*</span>
        </label>
        <input
          type="text"
          value={asset.data.title}
          onChange={(e) => onUpdate('data.title', e.target.value)}
          className="form-input"
          placeholder={t('form.enterTitle')}
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
        <h4 className="section-subtitle">{t('form.defaultAction')}</h4>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">{t('form.label')}</label>
            <input
              type="text"
              value={asset.data.defaultAction.label}
              onChange={(e) => onUpdate('data.defaultAction.label', e.target.value)}
              className="form-input"
              placeholder={t('form.enterLabel')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('form.action')}</label>
            <select
              value={asset.data.defaultAction.action}
              onChange={(e) => onUpdate('data.defaultAction.action', e.target.value)}
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
    </div>
  );
};

export default CardForm;