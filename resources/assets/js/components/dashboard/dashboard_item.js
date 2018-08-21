import React, { Component } from 'react';

class DashboardItem extends Component {
    renderOptions() {
        const { label, onClickOption, type, labelDropdown, dropdownObject } = this.props;
        if (type === 'button') {
            return (
                <div className='dashboard-item-div item-panel' onClick={onClickOption}>
                    {label}
                </div>
            );
        } else if (type === 'dropdown' && dropdownObject) {
            return (
                <div className='item-panel'>
                    <p>{labelDropdown}</p>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderOptions()}
            </div>
        );
    }
}

export default DashboardItem; 