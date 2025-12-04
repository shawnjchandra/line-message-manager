import React from 'react';
import PhoneFrame from '../PhoneFrame/PhoneFrame'; 
import { Send, Menu, User } from 'lucide-react';
import { Asset } from '../../types/Asset'; 
import LinePreviewProps from '../../types/LinePreviewProps';
import { MAX_ACTION_BUTTONS } from '../../types/constants';
import './LinePreview.scss';

const ASPECT_RATIO_STYLES: Record<string, { aspectRatio: string; minHeight: string }> = {
  rectangle: { aspectRatio: '1.51 / 1', minHeight: '120px' },
  square: { aspectRatio: '1 / 1', minHeight: '160px' }
};

const resolveImageStyle = (data: any) => {
  const normalizedRatio = (data.imageAspectRatio || 'rectangle').toLowerCase();
  const ratioStyle = ASPECT_RATIO_STYLES[normalizedRatio] || ASPECT_RATIO_STYLES.rectangle;
  const shouldContain = (data.imageSize || '').toLowerCase() === 'contain';

  return {
    width: '100%',
    ...ratioStyle,
    backgroundColor: data.imageBackgroundColor || '#eee',
    backgroundImage: data.image ? `url(${data.image})` : 'none',
    backgroundSize: shouldContain ? 'contain' : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  } as React.CSSProperties;
};

const LinePreview: React.FC<LinePreviewProps> = ({ assets }) => {

  const getCardActions = (data: any) => {
    if (Array.isArray(data.actions) && data.actions.length) {
      return data.actions.slice(0, MAX_ACTION_BUTTONS);
    }

    if (data.defaultAction) {
      return [data.defaultAction];
    }

    return [];
  };

  const getConfirmActions = (data: any) => {
    if (Array.isArray(data.actions) && data.actions.length) {
      return data.actions.slice(0, MAX_ACTION_BUTTONS);
    }

    return [data.actionButton1, data.actionButton2].filter(Boolean).slice(0, MAX_ACTION_BUTTONS);
  };

  const renderCard = (asset: Asset) => {
    const data = asset.data as any; 
    const cardActions = getCardActions(data);
    
    const getAspectRatioStyle = (ratioName: string) => {
      switch (ratioName) {
        case 'Rectangle':
          return '1.51 / 1'; 
        case 'Square':
          return '1 / 1';
        default:
          return ratioName ? ratioName.replace(':', '/') : undefined;
      }
    };

    const isContain = data.imageSize === 'Contain';
    const imageClass = isContain ? 'size-contain' : 'size-cover';

    const ratioValue = getAspectRatioStyle(data.imageAspectRatio);
    const ratioStyle = ratioValue ? { aspectRatio: ratioValue } : undefined;

    const boxStyle = {
      ...ratioStyle,
      backgroundColor: data.imageBackgroundColor || '#eee',
      minHeight: ratioValue ? 'auto' : '150px' 
    };

    return (
      <div key={asset.id} className="card border-0 shadow-sm mb-3" style={{ maxWidth: '240px', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={resolveImageStyle(data)}>
          {!data.image && (
            <div className="d-flex h-100 w-100 align-items-center justify-content-center text-muted" style={{ fontSize: '12px' }}>
              Image preview
            </div>
          )}
        </div>
        
        <div className="card-body">
          <h6 className="card-title">
            {data.title || "No Title"}
          </h6>
          <p className="card-desc">
            {data.description || data.text || "No description"}
          </p>
          <div className="card-actions">
            {cardActions.length > 0 ? (
              cardActions.map((action: any, index: number) => (
                <button key={`card-action-${index}`} className="action-btn">
                  {action?.label || `Action ${index + 1}`}
                </button>
              ))
            ) : (
              <button className="action-btn">Action</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderConfirm = (asset: Asset) => {
    const data = asset.data as any;
    const confirmActions = getConfirmActions(data);

    return (
      <div key={asset.id} className="line-card confirm-layout">
        <div className="card-body">
          <h6 className="title-confirm">
            {data.title || "Confirm?"}
          </h6>
          <div className="btn-group-confirm">
            {confirmActions.length > 0 ? (
              confirmActions.map((action: any, index: number) => (
                <button key={`confirm-action-${index}`} className="confirm-btn">
                  {action?.label || `Option ${index + 1}`}
                </button>
              ))
            ) : (
              <>
                <button className="confirm-btn">Yes</button>
                <button className="confirm-btn">No</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="line-preview-wrapper">
      <PhoneFrame>
        <div className="chat-interface">
          {/* Header */}
          <div className="chat-header">
             <Menu size={20} className="me-3" />
             <span className="header-title">Bot Preview</span>
          </div>

          {/* Chat Area */}
          <div className="chat-body">
             <div className="bot-identity">
               <div className="avatar-circle">
                 <User size={20} color="black" />
               </div>
               <small className="bot-name">Bot</small>
             </div>

             {assets.length === 0 ? (
                <div className="empty-state">
                  <small>No assets added...</small>
                </div>
             ) : (
               assets.map((asset) => {
                 if (asset.type === 'confirm') {
                   return renderConfirm(asset);
                 } else {
                  return renderCard(asset);
                 }
               })
             )}
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <div className="input-mock">
              <small>Enter a message...</small>
            </div>
            <Send size={20} className="send-icon" />
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};

export default LinePreview;