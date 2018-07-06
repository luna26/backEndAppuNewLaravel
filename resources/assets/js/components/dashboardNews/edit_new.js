import React, { Component } from 'react';

class EditNew extends Component {

    returnInfo() {
        const SERVER_URL = 'http://34.219.69.51';
        if (this.props.infoUpdate) {
            const refInputTitle = React.createRef();
            const refInputDesc = React.createRef();
            const refInputId = React.createRef();
            const { onClickCloseUpdate, onClickUpdate, onChangeTitle, onChangeDesc, title, desc } = this.props;
            const { news_url_image, news_id } = this.props.infoUpdate[0];
            return (
                <div className='edit-form-contaier'>
                    <p>Editando Noticia</p>
                    <div className='edit-new-title'>
                        <p>Titulo (max 150)</p>
                        <input
                            ref={refInputTitle}
                            value={title}
                            onChange={event => onChangeTitle(event.target.value)}
                            maxLength="150"
                        />
                    </div>
                    <div className='edit-new-desc'>
                        <p>Descripcion (max 900)</p>
                        <textarea
                            ref={refInputDesc}
                            value={desc}
                            onChange={event => onChangeDesc(event.target.value)}
                            maxLength="900"
                        />
                    </div>
                    {/* <div>
                        <img src={SERVER_URL + news_url_image} />
                        <p>Cambiar imagen de noticia</p>
                        <input type='file' />
                    </div> */}
                    <div>
                        <p><button ref={refInputId} data-id={news_id} onClick={onClickUpdate.bind(this, refInputId, refInputTitle, refInputDesc)} className='btn-style'>Aceptar / Enviar</button></p>
                        <p><button onClick={onClickCloseUpdate.bind(this, false, null)} className='btn-style'>Cerrar</button></p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='edit-form-contaier'>
                    Cargando Informacion
                </div>
            );
        }
    }

    returnTitle() {
        const { news_title } = this.props.infoUpdate[0];
        const { updateTitle } = this.props;
        if (updateTitle === ''){
            return news_title;
        }else{
            return updateTitle;
        }
    }

    returnDesc() {
        const { news_desc } = this.props.infoUpdate[0];
        const { updateDesc } = this.props;
        if (updateDesc === ''){
            return news_desc;
        }else{
            return updateDesc;
        }
    }
    render() {
        return (
            <div className='edit-new-container'>
                {this.returnInfo()}
            </div>
        );
    }
}

export default EditNew;