import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getInfoDashboard,
    updateInfoDetails
} from '../../actions';
import {
    Tab,
    Tabs,
    Modal,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';

class DashboardInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info_details: ''
        };
    }

    componentDidMount() {
        this.props.getInfoDashboard();
    }

    componentDidUpdate(){
        if(this.state.info_details == ''){
            this.setState({
                info_details: this.props.info.info.info_details
            });
        }
    }

    onInputChangeInfoDetails(term){
        this.setState({
            info_details:term
        });
    }

    returnInfo() {
        if (this.props.info.info) {
            return (
                <div>
                    {
                        <textarea
                            rows='20'
                            cols='100'
                            value={this.state.info_details}
                            onChange={event => this.onInputChangeInfoDetails(event.target.value)}
                        />
                    }
                    <div>
                        <button onClick={this.updateInfo.bind(this)}className='btn btn-info' >Actualizar</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    Cargando Información.
                </div>
            );
        }
    }

    updateInfo(){
        this.props.updateInfoDetails(this.state.info_details);
    }

    returnLoader() {
        if (this.props.calc.loadModal) {
            return (
                <div className='loader-calc'>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Enviando Información</Modal.Title>
                        </Modal.Header>
                    </Modal.Dialog>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='container-info'>
                {this.returnLoader()}
                <p>Información de la Universidad</p>
                {this.returnInfo()}
            </div>
        );
    }
}

const mapStateToProps = ({ info, calc }) => {
    return {
        info: info,
        calc:calc
    };
};

export default connect(mapStateToProps, {
    getInfoDashboard,
    updateInfoDetails
})(DashboardInfo);