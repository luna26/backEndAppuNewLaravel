import React, { Component } from 'react';
import * as classNames from 'classnames';
import {
    onLoadNews,
    uploadNewRequest,
    onClickOpen,
    deleteNew,
    openUpdateModal,
    updateNew,
    onChangeTitleUpdate,
    onChangeDescUpdate
} from '../../actions';
import { connect } from 'react-redux';
import DashboardItemNews from './dashboard_item_new';
import ModalNewUpload from './modal_new_upload';
import EditNew from './edit_new';

class DashboardNews extends Component {
    constructor(props){
        super(props);

        this.state = {
            titleNewText : '',
            descNewText:''
        }
    }
    componentDidMount() {
        this.loadNews();
    }

    loadNews() {
        this.props.onLoadNews();
    }

    onChangeTitleNew(text){
        this.setState({
            titleNewText:text
        });
    }

    onChangeDescNew(text){
        this.setState({
            descNewText:text
        });
    }

    returnNews() {
        const newsArray = this.props.news.news;
        if (newsArray) {
            return this.props.news.news.map(function (newItem, index) {
                return <DashboardItemNews key={newItem.news_id} keyNew={newItem.news_id} onUpdateModal={this.openUpdateModal.bind(this)} onDelete={this.onDeleteNew.bind(this)} newTitle={this.returnExtendTitle(newItem.news_title)} newDate={newItem.news_date} newUrl={newItem.news_url_image} />
            }.bind(this));
        }
    }

    returnExtendTitle(title){
        if(title.length >= 50){
            return title.substring(0, 70) + '...';
        }else{
            return title;
        }
    }

    onDeleteNew(event) {
        this.props.deleteNew(event.current.getAttribute("data-id"));
    }

    returnModalUpload() {
        if (this.props.news.openNewUploadModal) return <ModalNewUpload onChangeDescNew={this.onChangeDescNew.bind(this)} onChangeTitleNew={this.onChangeTitleNew.bind(this)} onClose={this.onCloseModal.bind(this)} sendRequestFunction={this.onClickUploadRequest.bind(this)} />;
    }

    onClickUploadRequest(ref) {
        this.props.uploadNewRequest(this.state.titleNewText, this.state.descNewText, ref.current.files[0]);
    }

    onClickShowModal() {
        this.props.onClickOpen(true);
    }

    onCloseModal() {
        this.props.onClickOpen(false);
    }

    openUpdateModal(open, event) {
        if (event) {
            this.props.openUpdateModal(open, event.current.getAttribute("data-id"));
        } else {
            this.props.openUpdateModal(open, null);
        }
    }

    returnEditModal() {
        if (this.props.news.openModalUpdate) return <EditNew desc={this.props.news.updateDesc} title={this.props.news.updateTitle} onChangeDesc={this.onChangeDesc.bind(this)} onChangeTitle={this.onChangeTitle.bind(this)} onClickUpdate={this.updateNew.bind(this)} onClickCloseUpdate={this.props.openUpdateModal.bind(this)} infoUpdate={this.props.news.updateInfo} updateDesc={this.props.news.updateDesc} updateTitle={this.props.news.updateTitle} />
    }

    onChangeTitle(title) {
        this.props.onChangeTitleUpdate(title);
    }

    onChangeDesc(desc) {
        this.props.onChangeDescUpdate(desc);
    }

    updateNew(Refid, Reftitle, Refdesc, Refimg) {
        this.props.updateNew(Refid.current.getAttribute("data-id"), Reftitle.current.value, Refdesc.current.value);
    }

    render() {
        if (this.props.news.mountComponentAgain) this.loadNews();
        let classNamesReturn = classNames({
            'blur-style': this.props.news.openNewUploadModal || this.props.news.openModalUpdate
        });
        return (
            <div className='dashboard-news'>
                {this.returnEditModal()}
                {this.returnModalUpload()}
                <div className={classNamesReturn}>
                    <div className='container-upload-new-button' onClick={this.onClickShowModal.bind(this)}>
                        <i className="material-icons glyphicon glyphicon-plus" />
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
    deleteNew,
    openUpdateModal,
    updateNew,
    onChangeTitleUpdate,
    onChangeDescUpdate
})(DashboardNews);