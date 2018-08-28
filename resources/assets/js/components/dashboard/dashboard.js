import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickOptionPanel } from '../../actions';
import DashboardPanel from './dashboard_panel';
import DashboardItem from './dashboard_item';
import DashboardNews from '../dashboardNews/dashboard-news';
import logoUcem from '../../../images/Logo-ucem.png';
import loader from '../../../images/8.gif';
import DashboardCareers from '../dashboardCareer/dashboard_careers';
import DashboardInfo from '../dashboardInfo/dashboardInfo';
import DashboardCalc from '../dashboardCalc/dashboardCalc';

class Dashboard extends Component {
    returnComponentToLoad() {
        switch (this.props.dashboard.panelOptionSelected) {
            case 1:
                return <DashboardNews />;
            case 2:
                return <DashboardCareers />;
            case 3:
                return <DashboardInfo />;
            case 4:
                return <DashboardCalc />;
            default:
                return (
                    <div className='title-appu'>
                        Bienvenido al panel administrativo!
                    </div>
                );
        }
    }

    returnLoader() {
        if (this.props.dashboard.showLoader) {
            return (
                <div className='loader-container'>
                    <div className='loader-info'>
                        <img src={loader} />
                    </div>
                </div>
            );
        }
    }

    render() {
        const { clickOptionPanel } = this.props;
        return (
            <div className='dashboard-container'>
                {this.returnLoader()}
                <div className='dashboard-col-1'>
                    <DashboardPanel>
                        <img src={logoUcem} className='logo-panel' onClick={clickOptionPanel.bind(this, 0)} />
                        <DashboardItem type={'button'} label={'Noticias'} onClickOption={clickOptionPanel.bind(this, 1)} />
                        <DashboardItem type={'button'} label={'Carreras'} onClickOption={clickOptionPanel.bind(this, 2)} />
                        <DashboardItem type={'button'} label={'Informacion'} onClickOption={clickOptionPanel.bind(this, 3)} />
                        <DashboardItem type={'button'} label={'Calculadora'} onClickOption={clickOptionPanel.bind(this, 4)} />
                    </DashboardPanel>
                </div>
                <div className='dashboard-col-2'>
                    {this.returnComponentToLoad()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ dashboard }) => {
    return {
        dashboard: dashboard
    };
};

export default connect(mapStateToProps, { clickOptionPanel })(Dashboard);