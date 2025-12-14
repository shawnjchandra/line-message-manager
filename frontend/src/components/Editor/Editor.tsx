import React, { useEffect, useMemo, useState } from 'react';
import { Asset } from '../../types/Asset';
import { createNewAsset, normalizeAssets, setNestedValue, validateAllAssets } from '../../utils/AssetUtils';
// import { saveAssets } from './api';
import InitialState from './InitialState/InitialState';
import TypeSelector from './TypeSelector/TypeSelector';
import AssetItem from './AssetItem/AssetItem';
import LinePreview from '../LinePreview/LinePreview';
import './Editor.scss';
import { ProjectService } from '../../services/ProjectService';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useToastStore from '../../stores/toastStore';
import { Spinner } from 'react-bootstrap';

const MultiAssetManager: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [templateTitleInput, setTemplateTitleInput] = useState<string>("");
  const [showTypeSelector, setShowTypeSelector] = useState<boolean>(false);
  const [insertAfterIndex, setInsertAfterIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
   const showToast = useToastStore((state) => state.showToast);  
  
  const { id } = useParams<{id:string}>();
  const [ currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const isEditingExisting = Boolean(id);
  const templateTitle = useMemo(
    () => templateTitleInput.trim() || t('editor.createNewTemplate'),
    [templateTitleInput, t]
  );

  useEffect(()=>{
    // console.log(id)
    if (id) {
      setLoading(true);
      showToast({
          type: 'info',
          message: (<>
            <Spinner animation="border" className="me-2" />  <span>Loading Data</span>
          </>),
          title: 'Syncing',
          delay: 90000
        });
      const loadExistingProject = async ()=>{
        try {
          const projectData = await ProjectService.getById(parseInt(id));
          // console.log(projectData)
          if (projectData) {
            setAssets(normalizeAssets(projectData.assets));
            setCurrentProjectId(projectData.templateId)
            setTemplateTitleInput(
              projectData.title || ""
            );
          }
        } catch (e){
          console.error(e)
        }finally{
          setLoading(false);
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
      // alert(t('editor.deleteTemplateSuccess', 'Template deleted successfully.'));
      showToast({
          type: 'success',
          message: t('editor.deleteTemplateSuccess', 'Template deleted successfully.'),
          title: t('toast.success'),
        });
    
      history.push('/workspace');
    
    } catch (error) {
      // console.error('Failed to delete template', error);

      // alert(t('editor.deleteTemplateError', 'Failed to delete template. Please try again.'));
      showToast({
          type: 'failed',
          message: t('editor.deleteTemplateError', 'Failed to delete template. Please try again.'),
          title: t('toast.failed'),
        });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<void> => {
    
    if (!validateAllAssets(assets)) {
      showToast({
          type: 'failed',
          message: t('editor.validationError'),
          title: t('toast.error'),
        });
      return;
    }
    setLoading(true);
    showToast({
              type: 'info',
              message: (<>
                <Spinner animation="border" className="me-2" />  <span>Loading Data</span>
              </>),
              title: 'Syncing',
              delay: 90000
            });
    try {
      // await saveAssets(assets);
      const savedId = await ProjectService.saveProjects(
        assets,
        currentProjectId,
        templateTitleInput
      );

      setCurrentProjectId(savedId);
      showToast({
          type: 'success',
          message: t('editor.assetsSavedSuccessfully'),
          title: t('toast.success'),
        });


      history.push('/workspace');
    } catch (error) {
      showToast({
          type: 'failed',
          message: t('editor.saveError'),
          title: t('toast.error'),
        });
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
    <div className="multi-asset-manager">
      {isEditingExisting && (
        <div className="manager-back-wrapper">
          <button
            type="button"
            className="manager-back-btn"
            onClick={handleCancel}
          >
            ← {t('editor.back', 'Back')}
          </button>
        </div>
      )}
      <div className="manager-header">
        <h1 className="manager-title">{templateTitle}</h1>
      </div>

      <div className="asset-content">
        <div className="asset-inner-stuff">
          <div className="manager-content">
            {assets.length > 0 && (
              <div className="template-title-input form-group">
                <label className="form-label" htmlFor="template-title-input">
                  {t('editor.templateTitle')}
                </label>
                <input
                  id="template-title-input"
                  className="form-input"
                  type="text"
                  value={templateTitleInput}
                  onChange={(e) => setTemplateTitleInput(e.target.value)}
                  placeholder={t('editor.enterTemplateTitle') as string}
                />
              </div>
            )}
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
            <div className="manager-footer">
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
              {!isEditingExisting && (
                <button 
                  className="btn btn-secondary" 
                  onClick={handleCancel} 
                  disabled={loading}
                  type="button"
                >
                  {t('editor.cancel')}
                </button>
              )}
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