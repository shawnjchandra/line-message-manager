import React from 'react';

interface TypeSelectorProps {
  onSelectType: (type: 'card' | 'confirm') => void;
  onCancel: () => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ onSelectType, onCancel }) => {
  return (
    <div className="type-selector-overlay" onClick={onCancel}>
      <div className="type-selector-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="type-selector-title">Select Asset Type</h3>
        <div className="type-selector-buttons">
          <button
            className="type-selector-button"
            onClick={() => onSelectType('card')}
            type="button"
          >
            Card
          </button>
          <button
            className="type-selector-button"
            onClick={() => onSelectType('confirm')}
            type="button"
          >
            Confirm
          </button>
        </div>
        <button 
          className="type-selector-cancel" 
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TypeSelector;