import React from 'react';
import './QNSOwnership.css';

const MoreIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>

const QNSOwnership = () => {
    return (
        <div className="qns-ownership-page">
            <div className="roles-card">
                <div className="roles-header">
                    <h2>Roles</h2>
                    <span className="address-count">2 addresses</span>
                </div>
                <div className="roles-list">
                    <div className="role-item">
                        <div className="role-user">
                            <div className="role-avatar"></div>
                            <span>0xb5B...Fb489</span>
                        </div>
                        <div className="role-tags">
                            <span className="role-tag owner">Owner</span>
                        </div>
                        <button className="more-btn"><MoreIcon /></button>
                    </div>
                     <div className="role-item">
                        <div className="role-user">
                            <div className="role-avatar"></div>
                            <span>0xb5B...Fb489</span>
                        </div>
                        <div className="role-tags">
                            <span className="role-tag">Manager</span>
                             <span className="role-tag">Eth Records</span>
                        </div>
                        <button className="more-btn"><MoreIcon /></button>
                    </div>
                </div>
            </div>

            <div className="dates-card">
                 <div className="date-item">
                    <span>Names expires</span>
                    <p>Feb 1, 2033 &nbsp; 03:22:39</p>
                </div>
                 <div className="date-item">
                    <span>Grace period ends</span>
                    <p>May 2, 2033 &nbsp; 03:22:39</p>
                </div>
                 <div className="date-item">
                    <span>Registered</span>
                    <p>Feb 1, 2033 &nbsp; 03:22:39</p>
                </div>
            </div>

            <div className="ownership-actions">
                <button className="btn-reminder">Set Reminder</button>
                <button className="btn-extend">Extend</button>
            </div>
        </div>
    );
};

export default QNSOwnership;