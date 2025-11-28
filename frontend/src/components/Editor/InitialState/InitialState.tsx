import React from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InitialStateProps {
  onCreateAsset: () => void;
}

const InitialState: React.FC<InitialStateProps> = ({ onCreateAsset }) => {
  const { t } = useTranslation();
  return (
    <div className="initial-state-container">
      <button 
        className="initial-create-button"
        onClick={onCreateAsset}
      >
        <Plus className="initial-create-icon" />
        <span>{t('editor.createNewTemplate')}</span>
      </button>
    </div>
  );
};
    
export default InitialState;