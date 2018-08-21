import React, { Component } from 'react';
import {URL_SERVER} from '../../config';

class DashboardItemNews extends Component {
    render() {
        const refDeleteButton = React.createRef();
        const refEditButton = React.createRef();
        const { keyNew, newTitle, newDate, newUrl, onDelete, onUpdateModal } = this.props;
        
        return (
            <div className='container-dashboard-new'>
                <span>{newDate}</span>
                <img src={URL_SERVER+newUrl} />
                <span>{newTitle}</span>
                <div className='dashboard-container-buttons'>
                    <button className='btn btn-info' data-id={keyNew} onClick={onUpdateModal.bind(this, true, refEditButton)} ref={refEditButton}>
                        Editar
                    </button>
                    <button className='btn btn-danger' data-id={keyNew} key={keyNew} onClick={onDelete.bind(this, refDeleteButton)} ref={refDeleteButton}>
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }
}

export default DashboardItemNews;