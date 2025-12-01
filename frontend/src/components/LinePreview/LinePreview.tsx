import React from 'react';
import PhoneFrame from '../PhoneFrame/PhoneFrame'; 
import { Send, Menu, User } from 'lucide-react';
import { Asset } from '../../types/Asset'; 
import LinePreviewProps from '../../types/LinePreviewProps';
import './LinePreview.scss';

const LinePreview: React.FC<LinePreviewProps> = ({ assets }) => {

  const renderCard = (asset: Asset) => {
    const data = asset.data as any; 
    
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
      <div key={asset.id} className="line-card">
        {data.image && (
          <div 
            className="card-image-container"
            style={{ 
              ...ratioStyle,
              backgroundColor: data.imageBackgroundColor || '#eee'
            }} 
          >
            <img 
              src={data.image} 
              alt="Preview" 
              className={imageClass} 
            />
          </div>
        )}
        
        <div className="card-body">
          <h6 className="card-title">
            {data.title || "No Title"}
          </h6>
          <p className="card-desc">
            {data.description || data.text || "No description"}
          </p>
          <button className="action-btn">
            {data.defaultAction?.label || "Action"}
          </button>
        </div>
      </div>
    );
  };

  const renderConfirm = (asset: Asset) => {
    const data = asset.data as any;

    return (
      <div key={asset.id} className="line-card confirm-layout">
        <div className="card-body">
          <h6 className="title-confirm">
            {data.title || "Confirm?"}
          </h6>
          <div className="btn-group-confirm">
            <button className="confirm-btn">
              {data.actionButton1?.label || "Yes"}
            </button>
            <button className="confirm-btn">
              {data.actionButton2?.label || "No"}
            </button>
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