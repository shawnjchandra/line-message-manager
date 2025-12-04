import React from 'react';
import { Plus, X } from 'lucide-react';
import { ConfirmAsset } from '../../../types/Asset';
import { useTranslation } from 'react-i18next';
import {
  ACTION_OPTIONS,
  CONFIRM_MIN_ACTIONS,
  MAX_ACTION_BUTTONS,
  createConfirmAction
} from '../../../types/constants';

interface ConfirmFormProps {
  asset: ConfirmAsset;
  onUpdate: (path: string, value: any) => void;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({ asset, onUpdate }) => {
  const { t } = useTranslation();
  const actions = Array.isArray(asset.data.actions) ? asset.data.actions : [];
  const canAddAction = actions.length < MAX_ACTION_BUTTONS;

  const handleRemoveAction = (index: number) => {
    if (actions.length <= CONFIRM_MIN_ACTIONS) return;
    const updated = actions.filter((_, i) => i !== index);
    onUpdate('data.actions', updated);
  };

  const handleAddAction = () => {
    if (!canAddAction) return;
    onUpdate('data.actions', [...actions, createConfirmAction()]);
  };
  return (
    <div className="asset-form">
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

      <div className="default-action-section">
        <div className="action-section-header">
          <h4 className="section-subtitle">{t('form.confirmActionsTitle', 'Action Buttons')}</h4>
        </div>

        {actions.map((action, index) => (
          <div key={`confirm-action-${index}`} className="action-button-section">
            <div className="action-section-header">
              <h5 className="section-subtitle">
                {t('form.actionButtonDynamic', { index: index + 1 })}
              </h5>
              {actions.length > CONFIRM_MIN_ACTIONS && (
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
                <label className="form-label">
                  {t('form.label')} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={action.label}
                  onChange={(e) => onUpdate(`data.actions.${index}.label`, e.target.value)}
                  className="form-input"
                  placeholder={t('form.enterLabel')}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t('form.action')} <span className="required">*</span>
                </label>
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

            <div className="form-group">
              <label className="form-label">
                {t('form.message')} <span className="required">*</span>
              </label>
              <input
                type="text"
                value={action.message}
                onChange={(e) => onUpdate(`data.actions.${index}.message`, e.target.value)}
                className="form-input"
                placeholder={t('form.enterMessage')}
              />
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

export default ConfirmForm;