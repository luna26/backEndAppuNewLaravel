import React, { Component } from 'react';

class DashboardItemNews extends Component {
    render() {
        const refDeleteButton = React.createRef();
        const { keyNew, newTitle, newDate, newUrl, onDelete } = this.props;
        const SERVER_URL = 'http://34.219.69.51';
        return (
            <div className='container-dashboard-new'>
                <span>{newDate}</span>
                <img src={SERVER_URL+newUrl} />
                <span>{newTitle}</span>
                <div className='dashboard-container-buttons'>
                    <button data-id={keyNew}>
                        Editar
                    </button>
                    <button data-id={keyNew} key={keyNew} onClick={onDelete.bind(this, refDeleteButton)} ref={refDeleteButton}>
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }
}

export default DashboardItemNews;