import React from 'react';
import PhoneFrame from '../PhoneFrame/PhoneFrame'; 
import { Send, Menu, User } from 'lucide-react';
import { Asset } from '../../types/Asset'; 
import LinePreviewProps from '../../types/LinePreviewProps';

const LinePreview: React.FC<LinePreviewProps> = ({ assets }) => {

  const renderCard = (asset: Asset, index: number) => {
    const data = asset.data as any; 
    
    return (
      <div key={asset.id} className="card border-0 shadow-sm mb-3" style={{ maxWidth: '240px', borderRadius: '12px', overflow: 'hidden' }}>
        {data.image && (
          <div style={{ 
            height: '120px', 
            backgroundImage: `url(${data.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#eee'
          }} />
        )}
        
        <div className="card-body p-3">
          <h6 className="card-title fw-bold mb-1" style={{ fontSize: '14px' }}>
            {data.title || "No Title"}
          </h6>
          <p className="card-text text-muted mb-3" style={{ fontSize: '12px', lineHeight: '1.4' }}>
            {data.description || data.text || "No description"}
          </p>
          <button className="btn w-100 fw-bold border-0" style={{ backgroundColor: '#f0f0f0', color: '#42659a', fontSize: '13px', padding: '8px' }}>
            {data.defaultAction?.label || "Action"}
          </button>
        </div>
      </div>
    );
  };

  const renderConfirm = (asset: Asset, index: number) => {
    const data = asset.data as any;

    return (
      <div key={asset.id} className="card border-0 shadow-sm mb-3" style={{ maxWidth: '240px', borderRadius: '12px', overflow: 'hidden' }}>
        <div className="card-body p-3 text-center">
          <h6 className="card-title fw-bold mb-3" style={{ fontSize: '14px' }}>
            {data.title || "Confirm?"}
          </h6>
          <div className="d-flex gap-2">
            <button className="btn flex-grow-1 fw-bold border-0" style={{ backgroundColor: '#f0f0f0', color: '#42659a', fontSize: '13px', padding: '8px' }}>
              {data.actionButton1?.label || "Yes"}
            </button>
            <button className="btn flex-grow-1 fw-bold border-0" style={{ backgroundColor: '#f0f0f0', color: '#42659a', fontSize: '13px', padding: '8px' }}>
              {data.actionButton2?.label || "No"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <PhoneFrame>
        <div className="d-flex flex-column h-100" style={{ backgroundColor: '#849ebf' }}>
          
          {/* Header */}
          <div className="d-flex align-items-center px-3 py-2 text-white" style={{ backgroundColor: '#232d3f' }}>
             <Menu size={20} className="me-3" />
             <span className="fw-bold">Bot Preview</span>
          </div>

          {/* Chat Area */}
          <div className="flex-grow-1 p-3 overflow-auto">
             <div className="d-flex align-items-center mb-3">
               <div className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px' }}>
                 <User size={20} color="black" />
               </div>
               <small className="text-white">Bot</small>
             </div>

             {/* Render Loop */}
             {assets.length === 0 ? (
                <div className="text-center text-white-50 mt-4"><small>No assets added...</small></div>
             ) : (
               assets.map((asset, index) => {
                 if (asset.type === 'confirm') {
                   return renderConfirm(asset, index);
                 } else {
                   return renderCard(asset, index);
                 }
               })
             )}
          </div>

          {/* Footer */}
          <div className="bg-white p-2 d-flex align-items-center">
            <div className="flex-grow-1 bg-light rounded px-2 py-1 me-2 text-muted">
              <small>Enter a message...</small>
            </div>
            <Send size={20} color="#42659a" />
          </div>

        </div>
      </PhoneFrame>
    </div>
  );
};

export default LinePreview;