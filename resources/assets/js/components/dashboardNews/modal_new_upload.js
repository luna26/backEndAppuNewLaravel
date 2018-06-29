import React, { Component } from 'react';

class ModalNewUpload extends Component {
    render() {
        console.log(this.props, 'CONTEXTO');
        const {sendRequestFunction, onClose} = this.props;
        this.inputFileRef = React.createRef();
        return (
            <div className='container-upload-new'>
                <div className='upload-new-form'>
                    <p>Cargar Nueva Noticia</p>
                    <div>
                        <p>Titulo</p>
                        <input type='test'/>
                    </div>
                    <div>
                        <p>Descripcion</p>
                        <textarea />
                    </div>
                    <div>
                        <p>Seleccione Imagen</p>
                        <input type='file'
                        ref={this.inputFileRef}
                        
                        />
                    </div>
                    <div>
                        <p>*Click para subir la noticia a la aplicacion</p>
                        <p><button className='btn-style' onClick={sendRequestFunction.bind(this, this.inputFileRef)}>Enviar</button></p>
                        <p><button className='btn-style' onClick={onClose.bind(this)}>Cerrar</button></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalNewUpload;