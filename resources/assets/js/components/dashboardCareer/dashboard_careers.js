import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCareers, postCareer, deleteCareer } from '../../actions';
import {URL_SERVER} from '../../config';

class DashboardCareers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openFormCreateCareer: false,
            formTitle: '',
            formDesc: ''
        }
    }

    componentWillMount() {
        this.loadCareers();
    }

    loadCareers(){
        this.props.getCareers();
    }

    renderRowTable(tableInfo) {
        const SERVER_URL = URL_SERVER;
        if (tableInfo) {
            return (
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Carrera</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.career.infoCareers.map(function (item, index) {
                                return (
                                    <tr key={index} >
                                        <th scope="row">{item.careers_title}</th>
                                        <th scope="row">
                                            <a className='btn btn-success' download href={SERVER_URL + item.careers_url_path}>Descargar Plan</a>
                                            <button className='btn btn-info'>Editar</button>
                                            <button id={item.careers_id} onClick={this.deleteCareer.bind(this)} className='btn btn-danger'>Eliminar</button>
                                        </th>
                                    </tr>
                                );
                            }.bind(this))
                        }

                    </tbody>
                </table>
            );
        } else {
            return (
                <div>Cargando Carreras</div>
            );
        }
    }

    openFormCareer(option) {
        this.setState({
            openFormCreateCareer: option
        });
    }

    deleteCareer(event) {
        this.props.deleteCareer(event.target.id);
    }

    changeFormTitle(text){
        this.setState({
            formTitle:text
        });
    }

    changeFormDesc(text){
        this.setState({
            formDesc:text
        });
    }

    renderFormPostCareer() {
        if (this.state.openFormCreateCareer == true) {
            const refCareerPlan = React.createRef();
            const refImageCareer = React.createRef();
            return (
                <div className='form-container-post-career'>
                    <div>
                        <label>Nombre de la carrera</label>
                        <input
                           onChange={event => this.changeFormTitle(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>Descripción de la carrera</label>
                        <textarea
                            onChange={event => this.changeFormDesc(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>Plan de carrera</label>
                        <input type='file' ref={refCareerPlan} />
                    </div>
                    <div>
                        <label>Imagen a mostrar en la aplicación</label>
                        <input type='file' ref={refImageCareer} />
                    </div>
                    <div>
                        <button onClick={this.postCareer.bind(this, refCareerPlan, refImageCareer)} className='btn btn-info'>Crear</button>
                        <button onClick={this.openFormCareer.bind(this, false)} className='btn btn-danger'>Cerrar</button>
                    </div>
                </div>
            );
        }
    }

    postCareer(refCareerPlan, refImgCareer) {
        this.props.postCareer(this.state.formTitle, this.state.formDesc, refCareerPlan.current.files[0], refImgCareer.current.files[0]);
    }

    render() {
        if(this.props.career.loadComponentAgain) this.loadCareers();
        return (
            <div className='career-container'>
                <div>
                    <button onClick={this.openFormCareer.bind(this, true)} className='btn btn-warning btn-create-career'>Agregar Carrera</button>
                </div>
                {this.renderFormPostCareer()}
                <div className='table-career-container'>
                    {this.renderRowTable(this.props.career.infoCareers)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ career }) => {
    return {
        career: career
    };
};

export default connect(mapStateToProps, { getCareers, postCareer, deleteCareer })(DashboardCareers);