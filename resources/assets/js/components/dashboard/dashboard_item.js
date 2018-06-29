import React from 'react';

const DashboardItem = ({ label, onClickOption }) => {
    return (
        <div className='dashboard-item-div' onClick={onClickOption}>
            {label}
        </div>
    );
}

export default DashboardItem;