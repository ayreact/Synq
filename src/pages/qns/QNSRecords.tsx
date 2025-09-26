import { useState } from 'react';
import './QNSRecords.css';

const CopyIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const QNSRecords = () => {
  const [activeTab, setActiveTab] = useState('address');

  const addressRecords = [
      { key: 'Eth', value: '0x6154DCeEadd948111678616deD394A544E3ABe4' }
  ];

  return (
    <div className="qns-records-page">
      <div className="records-container">
        <div className="records-tabs">
          <button 
            className={`record-tab ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Text <span>0 Records</span>
          </button>
          <button 
            className={`record-tab ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            Address <span>{addressRecords.length} Records</span>
          </button>
        </div>

        <div className="records-content">
          {activeTab === 'address' && (
            <div className="address-records-list">
                {addressRecords.map(record => (
                    <div className="record-item" key={record.key}>
                        <span className="record-key">{record.key}</span>
                        <div className="record-value">
                            <span>{record.value}</span>
                            <button className="copy-btn"><CopyIcon /></button>
                        </div>
                    </div>
                ))}
            </div>
          )}
           {activeTab === 'text' && (
            <div className="empty-records">
                <p>No text records have been added.</p>
            </div>
          )}
        </div>
      </div>

      <div className="other-records-container">
            <div className="other-record-item">
                <h3>No Content Hash</h3>
                <p>No IPFS or decentralized content hash has been set for this name.</p>
            </div>
            <div className="other-record-item">
                 <h3>No ABI</h3>
                <p>No contract ABI has been set for this name.</p>
            </div>
      </div>
    </div>
  );
};

export default QNSRecords;