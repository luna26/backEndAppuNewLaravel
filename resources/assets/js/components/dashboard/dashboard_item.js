import React, { Component } from 'react';

class DashboardItem extends Component {
    renderOptions() {
        const { label, onClickOption, type, children, labelDropdown, dropdownObject, onClickOptionSelect } = this.props;
        if (type === 'button') {
            return (
                <div className='dashboard-item-div item-panel' onClick={onClickOption}>
                    {label}
                </div>
            );
        } else if (type === 'dropdown' && dropdownObject) {
            const selectOptioneRef = React.createRef();
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