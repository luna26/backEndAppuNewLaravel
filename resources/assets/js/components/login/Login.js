import React from 'react';
import { connect } from 'react-redux';
import {
    onClickSendLogin,
    onChangeTextEmail,
    onChangeTextPass
} from '../../actions';
import Header from '../header/header';

class Login extends React.Component {
    onInputChangeEmail(text){
        this.props.onChangeTextEmail(text);
    }
    onInputChangePassword(text){
        this.props.onChangeTextPass(text);
    }
    render() {
        const {email, password} = this.props.login;
        return (
            <div>
                <Header />
                <div className='form-login'>
                    <div className='form-input'>
                        <p>Nombre de usuario</p>
                        <input
                            onChange={event => this.onInputChangeEmail(event.target.value)}
                            value={email}
                        />
                    </div>
                    <div className='form-input'>
                        <p>Contraseña</p>
                        <input
                            onChange={event => this.onInputChangePassword(event.target.value)}
                            value={password}
                        />
                    </div>
                    <div className='form-button-container'>
                        <button onClick={this.props.onClickSendLogin.bind(this, email, password)}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({login}) => {
    return {
        login: login
    };
};

export default connect(mapStateToProps, { onClickSendLogin, onChangeTextEmail, onChangeTextPass })(Login);