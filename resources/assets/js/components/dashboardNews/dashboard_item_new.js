import React, { Component } from 'react';

class DashboardItemNews extends Component {
    render() {
        const { newId, newTitle, newDate, newUrl } = this.props;
        const SERVER_URL = 'http://34.219.69.51';
        return (
            <div className='container-dashboard-new'>
                <span>{newDate}</span>
                <img src={SERVER_URL+newUrl} />
                <span>{newTitle}</span>
                <div className='dashboard-container-buttons'>
                    <button data-id-element={newId}>
                        Editar
                    </button>
                    <button data-id-element={newId}>
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }
}

export default DashboardItemNews;