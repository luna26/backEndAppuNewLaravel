import React, { Component } from 'react';

class DashboardPanel extends Component {
    render() {
        return (
            <div className='dashboard-panel'>
                {this.props.children}
            </div>
        );
    }
}

export default DashboardPanel;