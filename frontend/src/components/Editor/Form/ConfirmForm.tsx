import React, { useEffect } from 'react';
import { ConfirmAsset } from '../../../types/Asset';
import { useTranslation } from 'react-i18next';
import { ACTION_OPTIONS } from '../../../types/constants';

interface ConfirmFormProps {
  asset: ConfirmAsset;
  onUpdate: (path: string, value: any) => void;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({ asset, onUpdate }) => {
  const { t } = useTranslation();
  return (
    <div className="asset-form">
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

      <div className="action-button-section">
        <h4 className="section-subtitle">{t('form.actionButton1')}</h4>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              {t('form.label')} <span className="required">*</span>
            </label>
            <input
              type="text"
              value={asset.data.actionButton1.label}
              onChange={(e) => onUpdate('data.actionButton1.label', e.target.value)}
              className="form-input"
              placeholder={t('form.enterLabel')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('form.action')} <span className="required">*</span>
            </label>
            <select
              value={asset.data.actionButton1.action}
              onChange={(e) => onUpdate('data.actionButton1.action', e.target.value)}
              className="form-select"
            >
              <option value="">{t('form.selectAction')}</option>
              {ACTION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            {t('form.message')} <span className="required">*</span>
          </label>
          <input
            type="text"
            value={asset.data.actionButton1.message}
            onChange={(e) => onUpdate('data.actionButton1.message', e.target.value)}
            className="form-input"
            placeholder={t('form.enterMessage')}
          />
        </div>
      </div>

      <div className="action-button-section">
        <h4 className="section-subtitle">{t('form.actionButton2')}</h4>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              {t('form.label')} <span className="required">*</span>
            </label>
            <input
              type="text"
              value={asset.data.actionButton2.label}
              onChange={(e) => onUpdate('data.actionButton2.label', e.target.value)}
              className="form-input"
              placeholder={t('form.enterLabel')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('form.action')} <span className="required">*</span>
            </label>
            <select
              value={asset.data.actionButton2.action}
              onChange={(e) => onUpdate('data.actionButton2.action', e.target.value)}
              className="form-select"
            >
              <option value="">{t('form.selectAction')}</option>
              {ACTION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            {t('form.message')} <span className="required">*</span>
          </label>
          <input
            type="text"
            value={asset.data.actionButton2.message}
            onChange={(e) => onUpdate('data.actionButton2.message', e.target.value)}
            className="form-input"
            placeholder={t('form.enterMessage')}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;