import React from 'react';
import { X, Upload } from 'lucide-react';
import { CardAsset } from '../../../types/Asset';
import { CHANNEL_OPTIONS, ASPECT_RATIO_OPTIONS, IMAGE_SIZE_OPTIONS, ACTION_OPTIONS } from '../../../types/constants';

interface CardFormProps {
  asset: CardAsset;
  onUpdate: (path: string, value: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ asset, onUpdate, onImageUpload, onRemoveImage }) => {
  
  const currentSize = asset.data.imageSize || 'Cover';
  const imageSizeClass = currentSize === 'Contain' ? 'size-contain' : 'size-cover';

  const containerStyle = asset.data.imageAspectRatio
    ? { 
        aspectRatio: asset.data.imageAspectRatio.replace(':', '/'),
        height: 'auto' 
      }
    : undefined; // If undefined, it falls back to CSS default (150px)

  

  return (
    <div className="asset-form">
  
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Upload Image</label>
          
          <div 
            className="image-upload-container"
            style={containerStyle} 
          >
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
                <span>Click to upload (Max 50 MB)</span>
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
          <label className="form-label">Image Aspect Ratio</label>
          <select
            value={asset.data.imageAspectRatio}
            onChange={(e) => onUpdate('data.imageAspectRatio', e.target.value)}
            className="form-select"
          >
            <option value="">Select ratio (Default)</option>
            {ASPECT_RATIO_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <label className="form-label">Image Size</label>
          <select
            value={asset.data.imageSize || 'NULL'}
            onChange={(e) => onUpdate('data.imageSize', e.target.value)}
            className="form-select"
          >
             {IMAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'NULL' ? 'Cover (Default)' : option}
              </option>
            ))}
          </select>

          <label className="form-label" style={{ marginTop: '1rem' }}>Image Background Color</label>
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

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          value={asset.data.description}
          onChange={(e) => onUpdate('data.description', e.target.value)}
          className="form-textarea"
          placeholder="Enter description"
          rows={3}
        />
      </div>

      <div className="default-action-section">
        <h4 className="section-subtitle">Default Action</h4>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Label</label>
            <input
              type="text"
              value={asset.data.defaultAction.label}
              onChange={(e) => onUpdate('data.defaultAction.label', e.target.value)}
              className="form-input"
              placeholder="Enter label"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Action</label>
            <select
              value={asset.data.defaultAction.action}
              onChange={(e) => onUpdate('data.defaultAction.action', e.target.value)}
              className="form-select"
            >
              <option value="">Select action</option>
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