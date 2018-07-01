import React, { Component } from 'react';
import * as classNames from 'classnames';
import { onLoadNews, uploadNewRequest, onClickOpen, deleteNew } from '../../actions';
import { connect } from 'react-redux';
import DashboardItemNews from './dashboard_item_new';
import ModalNewUpload from './modal_new_upload';

class DashboardNews extends Component {
    componentDidMount() {
        this.loadNews();
    }

    loadNews() {
        this.props.onLoadNews();
    }

    returnNews() {
        const newsArray = this.props.news.news;
        if (newsArray) {
            return this.props.news.news.map(function (newItem, index) {
                return <DashboardItemNews key={newItem.news_id} keyNew={newItem.news_id} onDelete={this.onDeleteNew.bind(this)} newTitle={newItem.news_title.substring(0, 70) + ' ...'} newDate={newItem.news_date} newUrl={newItem.news_url_image} />
            }.bind(this));
        }
    }

    onDeleteNew(event) {
        this.props.deleteNew(event.current.getAttribute("data-id"));
    }

    returnModalUpload() {
        if (this.props.news.openNewUploadModal) return <ModalNewUpload onClose={this.onCloseModal.bind(this)} sendRequestFunction={this.onClickUploadRequest.bind(this)} />;
    }

    onClickUploadRequest(ref) {
        this.props.uploadNewRequest('Titulo Funciono', 'Esto es una desc', ref.current.files[0]);
    }

    onClickShowModal() {
        this.props.onClickOpen(true);
    }

    onCloseModal() {
        this.props.onClickOpen(false);
    }

    render() {
        if (this.props.news.mountComponentAgain) this.loadNews();
        let classNamesReturn = classNames({
            'blur-style': this.props.news.openNewUploadModal
        });
        return (
            <div className='dashboard-news'>
                {this.returnModalUpload()}
                <div className={classNamesReturn}>
                    <div className='container-upload-new-button' onClick={this.onClickShowModal.bind(this)}>
                        <i className="material-icons md-48">add_circle_outline</i>
                        <span>Subir Noticia</span>
                    </div>
                    {this.returnNews()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ news }) => {
    return {
        news: news
    };
};

export default connect(mapStateToProps, {
    onLoadNews,
    uploadNewRequest,
    onClickOpen,
    deleteNew
})(DashboardNews);