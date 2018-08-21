import React, { Component } from 'react';

class ModalNewUpload extends Component {
    render() {
        const { sendRequestFunction, onClose, onChangeTitleNew, onChangeDescNew } = this.props;
        this.inputFileRef = React.createRef();
        return (
            <div className='container-upload-new'>
                <div className='upload-new-form'>
                    <p>Cargar Nueva Noticia</p>
                    <div>
                        <p>Titulo (max 150)</p>
                        <input
                            className='input-upload-new-title'
                            type='test'
                            maxLength="150"
                            onChange={event => onChangeTitleNew(event.target.value)}
                        />
                    </div>
                    <div>
                        <p>Descripcion (max 900)</p>
                        <textarea
                            className='input-upload-new-desc'
                            maxLength="900"
                            onChange={event => onChangeDescNew(event.target.value)}
                        />
                    </div>
                    <div>
                        <p>Seleccione Imagen (png,jpeg,jpg)</p>
                        <input
                            type='file'
                            accept=".png, .jpg, .jpeg"
                            ref={this.inputFileRef}
                            className='custom-file-upload'
                        />
                    </div>
                    <div>
                        <p>*Click para subir la noticia a la aplicacion</p>
                        <p><button className='btn btn-info' onClick={sendRequestFunction.bind(this, this.inputFileRef)}>Enviar</button></p>
                        <p><button className='btn btn-danger' onClick={onClose.bind(this)}>Cerrar</button></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalNewUpload;