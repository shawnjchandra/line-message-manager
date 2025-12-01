import React, { useEffect, useState } from 'react';
import { Asset } from '../../types/Asset';
import { createNewAsset, setNestedValue, validateAllAssets } from '../../utils/AssetUtils';
// import { saveAssets } from './api';
import InitialState from './InitialState/InitialState';
import TypeSelector from './TypeSelector/TypeSelector';
import AssetItem from './AssetItem/AssetItem';
import LinePreview from '../LinePreview/LinePreview';
import './Editor.scss';
import { ProjectService } from '../../services/ProjectService';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MultiAssetManager: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [showTypeSelector, setShowTypeSelector] = useState<boolean>(false);
  const [insertAfterIndex, setInsertAfterIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { id } = useParams<{id:string}>();
  const [ currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const isEditingExisting = Boolean(id);

  useEffect(()=>{
    console.log(id)
    if (id) {
      const loadExistingProject = async ()=>{
        try {
          const projectData = await ProjectService.getById(parseInt(id));
          console.log(projectData)
          if (projectData) {
            setAssets(projectData.assets);
            setCurrentProjectId(projectData.templateId)
          }
        } catch (e){
          console.error("Failed to load project")
        }
      };

      loadExistingProject();
    }
  },[id])

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
    if (window.confirm(t('editor.deleteConfirm'))) {
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

  const handleDeleteTemplate = async (): Promise<void> => {
    if (!currentProjectId) {
      return;
    }

    const confirmDelete = window.confirm(
      t('editor.deleteTemplateConfirm', 'Are you sure you want to delete this template?')
    );

    if (!confirmDelete) {
      return;
    }

    setLoading(true);
    try {
      await ProjectService.deleteProject(currentProjectId);
      alert(t('editor.deleteTemplateSuccess', 'Template deleted successfully.'));
      history.push('/workspace');
    } catch (error) {
      console.error('Failed to delete template', error);
      alert(t('editor.deleteTemplateError', 'Failed to delete template. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!validateAllAssets(assets)) {
      alert(t('editor.validationError'));
      return;
    }
    setLoading(true);
    try {
      // await saveAssets(assets);
      const savedId = await ProjectService.saveProjects(assets, currentProjectId);

      setCurrentProjectId(savedId);
      alert('Assets saved successfully!');
      history.push('/workspace');
    } catch (error) {
      alert(t('editor.saveError'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    if (isEditingExisting) {
      history.push('/workspace');
      return;
    }

    if (window.confirm(t('editor.cancelConfirm'))) {
      setAssets([]);
    }
  };


  return (
    <div className="multi-asset-manager container-fluid p-4"> {/* Added container-fluid */}
      <div className="manager-header mb-4">
        <h1 className="manager-title">{t('editor.createNewTemplate')}</h1>
      </div>

      <div className="row">
        <div className="col-lg-7 col-md-12">
          <div className="manager-content">
            {assets.length === 0 ? (
              <InitialState onCreateAsset={() => handleShowTypeSelector()} />
            ) : (
              <div className="assets-list">
                {assets.map((asset, index) => (
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
            <div className="manager-footer mt-4 d-flex gap-2">
              {isEditingExisting && currentProjectId && (
                <button
                  className="btn btn-danger ms-auto"
                  onClick={handleDeleteTemplate}
                  disabled={loading}
                  type="button"
                >
                  {t('editor.deleteTemplate', 'Delete Template')}
                </button>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={handleCancel} 
                disabled={loading}
                type="button"
              >
                {isEditingExisting ? t('editor.back', 'Back') : t('editor.cancel')}
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSave} 
                disabled={loading}
                type="button"
              >
                {loading ? t('editor.saving') : t('editor.saveAllAssets')}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The Live Preview */}
        {/* d-none d-lg-block hides it on mobile to save space */}
        <div className="preview-sidebar">
          <div className="preview-fixed-wrapper">
             <h5>Live Preview</h5>
             <LinePreview assets={assets} />
          </div>
        </div>
      </div>

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