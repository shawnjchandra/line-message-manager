import React from 'react';
import { ConfirmAsset } from './types';
import { CHANNEL_OPTIONS, ACTION_OPTIONS } from './constants';

interface ConfirmFormProps {
  asset: ConfirmAsset;
  onUpdate: (path: string, value: any) => void;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({ asset, onUpdate }) => {
  return (
    <div className="asset-form">
      <div className="form-group">
        <label className="form-label">
          Channel <span className="required">*</span>
        </label>
        <select
          value={asset.data.channel}
          onChange={(e) => onUpdate('data.channel', e.target.value)}
          className="form-select"
        >
          <option value="">Select channel</option>
          {CHANNEL_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          value={asset.data.title}
          onChange={(e) => onUpdate('data.title', e.target.value)}
          className="form-input"
          placeholder="Enter title"
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Alt Text <span className="required">*</span>
        </label>
        <input
          type="text"
          value={asset.data.altText}
          onChange={(e) => onUpdate('data.altText', e.target.value)}
          className="form-input"
          placeholder="Enter alt text"
        />
      </div>

      <div className="action-button-section">
        <h4 className="section-subtitle">Action Button 1</h4>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Label <span className="required">*</span>
            </label>
            <input
              type="text"
              value={asset.data.actionButton1.label}
              onChange={(e) => onUpdate('data.actionButton1.label', e.target.value)}
              className="form-input"
              placeholder="Enter label"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Action <span className="required">*</span>
            </label>
            <select
              value={asset.data.actionButton1.action}
              onChange={(e) => onUpdate('data.actionButton1.action', e.target.value)}
              className="form-select"
            >
              <option value="">Select action</option>
              {ACTION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Message <span className="required">*</span>
          </label>
          <input
            type="text"
            value={asset.data.actionButton1.message}
            onChange={(e) => onUpdate('data.actionButton1.message', e.target.value)}
            className="form-input"
            placeholder="Enter message"
          />
        </div>
      </div>

      <div className="action-button-section">
        <h4 className="section-subtitle">Action Button 2</h4>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Label <span className="required">*</span>
            </label>
            <input
              type="text"
              value={asset.data.actionButton2.label}
              onChange={(e) => onUpdate('data.actionButton2.label', e.target.value)}
              className="form-input"
              placeholder="Enter label"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Action <span className="required">*</span>
            </label>
            <select
              value={asset.data.actionButton2.action}
              onChange={(e) => onUpdate('data.actionButton2.action', e.target.value)}
              className="form-select"
            >
              <option value="">Select action</option>
              {ACTION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Message <span className="required">*</span>
          </label>
          <input
            type="text"
            value={asset.data.actionButton2.message}
            onChange={(e) => onUpdate('data.actionButton2.message', e.target.value)}
            className="form-input"
            placeholder="Enter message"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;