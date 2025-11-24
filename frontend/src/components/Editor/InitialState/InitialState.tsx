import React from 'react';
import { Plus } from 'lucide-react';

interface InitialStateProps {
  onCreateAsset: () => void;
}

const InitialState: React.FC<InitialStateProps> = ({ onCreateAsset }) => {
  return (
    <div className="initial-state-container">
      <button 
        className="initial-create-button"
        onClick={onCreateAsset}
      >
        <Plus className="initial-create-icon" />
        <span>Create New Template</span>
      </button>
    </div>
  );
};
    
export default InitialState;