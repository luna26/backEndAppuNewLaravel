import React, { Component } from 'react';
import * as classNames from 'classnames';
import { onLoadNews, uploadNewRequest, onClickOpen } from '../../actions';
import { connect } from 'react-redux';
import DashboardItemNews from './dashboard_item_new';
import ModalNewUpload from './modal_new_upload';

class DashboardNews extends Component {
    componentWillMount() {
        this.props.onLoadNews();
    }

    returnNews() {
        const newsArray = this.props.news.news;
        if (newsArray) {
            return this.props.news.news.map(function (newItem, index) {
                return <DashboardItemNews key={newItem.news_id} newTitle={newItem.news_title.substring(0, 70) + ' ...'} newDate={newItem.news_date} newUrl={newItem.news_url_image} />
            });
        }
    }

    returnModalUpload() {
         if(this.props.news.openNewUploadModal) return <ModalNewUpload onClose={this.onCloseModal.bind(this)} sendRequestFunction={this.onClickUploadRequest.bind(this)}/>;
    }

    onClickUploadRequest(ref){
        this.props.uploadNewRequest('Titulo Funciono', 'Esto es una desc', ref.current.files[0]);
    }

    onClickShowModal(){
        this.props.onClickOpen(true);
    }

    onCloseModal(){
        this.props.onClickOpen(false);
    }

    render() {
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

export default connect(mapStateToProps, { onLoadNews, uploadNewRequest, onClickOpen })(DashboardNews);