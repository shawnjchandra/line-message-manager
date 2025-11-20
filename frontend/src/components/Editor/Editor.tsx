import React, { useState } from 'react';
import { Asset } from './types';
import { createNewAsset, setNestedValue, validateAllAssets } from './Utils';
import { saveAssets } from './api';
import InitialState from './InitialState';
import TypeSelector from './TypeSelector';
import AssetItem from './AssetItem';
import './Editor.scss';

const MultiAssetManager: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [showTypeSelector, setShowTypeSelector] = useState<boolean>(false);
  const [insertAfterIndex, setInsertAfterIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShowTypeSelector = (afterIndex: number | null = null): void => {
    setInsertAfterIndex(afterIndex);
    setShowTypeSelector(true);
  };

  const handleAddAsset = (type: 'card' | 'confirm'): void => {
    const newAsset = createNewAsset(type);
    
    if (insertAfterIndex !== null) {
      const newAssets = [...assets];
      newAssets.splice(insertAfterIndex + 1, 0, newAsset);
      setAssets(newAssets);
    } else {
      setAssets([...assets, newAsset]);
    }
    
    setShowTypeSelector(false);
    setInsertAfterIndex(null);
  };

  const handleDeleteAsset = (id: string): void => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      setAssets(assets.filter((asset) => asset.id !== id));
    }
  };

  const handleMoveUp = (index: number): void => {
    if (index === 0) return;
    const newAssets = [...assets];
    const temp = newAssets[index - 1];
    newAssets[index - 1] = newAssets[index];
    newAssets[index] = temp;
    setAssets(newAssets);
  };

  const handleMoveDown = (index: number): void => {
    if (index === assets.length - 1) return;
    const newAssets = [...assets];
    const temp = newAssets[index];
    newAssets[index] = newAssets[index + 1];
    newAssets[index + 1] = temp;
    setAssets(newAssets);
  };

  const toggleExpand = (id: string): void => {
    setAssets(assets.map((asset) => 
      asset.id === id ? { ...asset, expanded: !asset.expanded } : asset
    ));
  };

  const updateAssetData = (id: string, path: string, value: any): void => {
    setAssets(assets.map((asset) => {
      if (asset.id !== id) return asset;
      return setNestedValue(asset, path, value);
    }));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateAssetData(id, 'data.image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id: string): void => {
    updateAssetData(id, 'data.image', null);
  };

  const handleSave = async (): Promise<void> => {
    if (!validateAllAssets(assets)) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await saveAssets(assets);
      alert('Assets saved successfully!');
    } catch (error) {
      alert('Failed to save assets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      setAssets([]);
    }
  };

  return (
    <div className="multi-asset-manager">
      <div className="manager-header">
        <h1 className="manager-title">Create New Template</h1>
      </div>

      <div className="manager-content">
        {assets.length === 0 ? (
          <InitialState onCreateAsset={() => handleShowTypeSelector()} />
        ) : (
          <div className="assets-list">
            {assets.map((asset,index) => (
              <AssetItem
                key={asset.id}
                asset={asset}
                index={index}
                totalAssets={assets.length}
                onToggleExpand={() => toggleExpand(asset.id)}
                onDelete={() => handleDeleteAsset(asset.id)}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                onUpdate={(path, value) => updateAssetData(asset.id, path, value)}
                onAddBelow={() => handleShowTypeSelector(index)}
                onImageUpload={(e) => handleImageUpload(asset.id, e)}
                onRemoveImage={() => handleRemoveImage(asset.id)}
              />
            ))}
          </div>
        )}
      </div>

      {assets.length > 0 && (
        <div className="manager-footer">
          <button 
            className="btn btn-secondary" 
            onClick={handleCancel} 
            disabled={loading}
            type="button"
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSave} 
            disabled={loading}
            type="button"
          >
            {loading ? 'Saving...' : 'Save All Assets'}
          </button>
        </div>
      )}

      {showTypeSelector && (
        <TypeSelector
          onSelectType={handleAddAsset}
          onCancel={() => setShowTypeSelector(false)}
        />
      )}
    </div>
  );
};

export default MultiAssetManager;