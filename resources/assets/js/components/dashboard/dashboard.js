import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickOptionPanel } from '../../actions';
import DashboardPanel from './dashboard_panel';
import DashboardItem from './dashboard_item';
import DashboardNews from '../dashboardNews/dashboard-news';
import logoUcem from '../../../images/Logo-ucem.png';
import loader from '../../../images/8.gif';

class Dashboard extends Component {
    returnComponentToLoad() {
        const OPTION = this.props.dashboard.panelOptionSelected;
        switch (this.props.dashboard.panelOptionSelected) {
            case 1:
                return <DashboardNews />;
                break;
            default:
                return <DashboardNews />;
                // return (
                //     <div>
                //         Bienvenido al panel administrativo de Appu!
                //     </div>
                // );
                break;
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
                        <DashboardItem label={'Noticias'} onClickOption={clickOptionPanel.bind(this, 1)} />
                        <DashboardItem label={'Eventos'} />
                        <DashboardItem label={'Carreras'} />
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