import React, { Component } from 'react';
import { connect } from 'react-redux';
import { URL_SERVER } from '../../config';
import {
    getSchedules,
    getCoursesCalcDashboard,
    getCoursesCareers,
    returnCourseSchedule
} from '../../actions';
import { Tab, Tabs } from 'react-bootstrap';

class DashboardCalc extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actualCareer: false
        }
    }

    componentWillMount() {
        this.props.getSchedules();
        this.props.getCoursesCalcDashboard();
        this.props.getCoursesCareers();
        this.props.returnCourseSchedule();
    }

    renderCourses() {
        if (this.props.calc.courses) {
            return (
                <div>
                    <p>Informacion de cursos</p>
                    <button className='btn btn-warning'>Agregar</button>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">CODIGO</th>
                                <th scope="col">Curso</th>
                                <th scope="col">Creditos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.calc.courses.map(function (item, index) {
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{item.course_code}</th>
                                            <th scope="row">{item.course_name}</th>
                                            <th scope="row">{item.course_credits}</th>
                                            <th scope="row"><button className='btn btn-danger'>Eliminar</button></th>
                                        </tr>
                                    );
                                }.bind(this))
                            }

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    Cargando Cursos.
                </div>
            );
        }
    }

    renderSchedule() {
        if (this.props.calc.schedules) {
            return (
                <div>
                    <p>Informacion de horarios</p>
                    <button className='btn btn-warning'>Agregar</button>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Dia</th>
                                <th scope="col">Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.calc.schedules.map(function (item, index) {
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{item.schedule_id}</th>
                                            <th scope="row">{item.day_name}</th>
                                            <th scope="row">{item.schedule_info}</th>
                                            <th scope="row"><button className='btn btn-danger'>Eliminar</button></th>
                                        </tr>
                                    );
                                }.bind(this))
                            }

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    Cargando Horarios.
                </div>
            );
        }
    }

    renderTab(careerId) {
        this.state.actualCareer == careerId ? true : false
    }

    renderCoursesCarrer() {
        let actualCareer;
        if (this.props.calc.coursesCareer) {
            return (
                <div>
                    <p>Informacion de Carreras/Cursos</p>
                    <button className='btn btn-warning'>Agregar</button>
                    {/* <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Carrera</th>
                                <th scope="col">Curso</th>
                                <th scope="col">Codigo del curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.calc.coursesCareer.map(function (item, index) {
                                    actualCareer = item.careers_id
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{item.careers_title}</th>
                                            <th scope="row">{item.course_name}</th>
                                            <th scope="row">{item.course_code}</th>
                                            <th scope="row"><button className='btn btn-danger'>Eliminar</button></th>
                                        </tr>
                                    );
                                }.bind(this))
                            }

                        </tbody>
                    </table> */}

                    <Tabs defaultActiveKey={5} id="uncontrolled-tab-example">

                        {
                            this.props.calc.coursesCareer.map(function (item, index) {
                                if (actualCareer != item.careers_id) {
                                    actualCareer = item.careers_id
                                    return (
                                        <Tab key={index} eventKey={index} title={item.careers_title}>
                                            <table className="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Curso</th>
                                                        <th scope="col">Codigo del curso</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.calc.coursesCareer.map(function (item1, index) {

                                                            if (actualCareer == item1.careers_id) {
                                                                return (
                                                                    <tr key={index} >
                                                                        <th scope="row">{item1.course_name}</th>
                                                                        <th scope="row">{item1.course_code}</th>
                                                                        <th scope="row"><button className='btn btn-danger'>Eliminar</button></th>
                                                                    </tr>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Tab>
                                    );
                                }
                            }.bind(this))
                        }

                    </Tabs>
                </div>
            );
        } else {
            return (
                <div>
                    Cargando Carreras/Cursos.
                </div>
            );
        }
    }

    returnCourseSchedule() {
        let actualCareer;
        console.log(this.props.calc.scheduleCareer, 'this.props.calc.scheduleCareer');
        if (this.props.calc.scheduleCareer) {
            return (
                <div>
                    <p>Informacion de Horarios/Cursos</p>
                    <button className='btn btn-warning'>Agregar</button>
                    {/* <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID Horario</th>
                                <th scope="col">Curso</th>
                                <th scope="col">Codigo del curso</th>
                                <th scope="col">Dia</th>
                                <th scope="col">Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.calc.scheduleCareer.map(function (item, index) {
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{item.schedule_id}</th>
                                            <th scope="row">{item.course_name}</th>
                                            <th scope="row">{item.course_code}</th>
                                            <th scope="row">{item.day_name}</th>
                                            <th scope="row">{item.schedule_info}</th>
                                            <th scope="row"><button className='btn btn-danger'>Eliminar</button></th>
                                        </tr>
                                    );
                                }.bind(this))
                            }

                        </tbody>
                    </table> */}
                    <Tabs defaultActiveKey={5} id="uncontrolled-tab-example">

                        {
                            this.props.calc.scheduleCareer.map(function (item, index) {
                                if (actualCareer != item.course_code) {
                                    actualCareer = item.course_code
                                    return (
                                        <Tab key={index} eventKey={index} title={item.course_name}>
                                            <table className="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Dia</th>
                                                        <th scope="col">Informacion de horario</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.calc.scheduleCareer.map(function (item1, index) {

                                                            if (actualCareer == item1.course_code) {
                                                                return (
                                                                    <tr key={index} >
                                                                        <th scope="row">{item1.day_name}</th>
                                                                        <th scope="row">{item1.schedule_info}</th>
                                                                        <th scope="row"><button className='btn btn-danger'>Eliminar</button></th>
                                                                    </tr>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Tab>
                                    );
                                }
                            }.bind(this))
                        }

                    </Tabs>
                </div>
            );
        } else {
            return (
                <div>
                    Cargando Horarios/Cursos.
                </div>
            );
        }
    }

    render() {
        return (
            <div className='container-info'>
                <div>
                    {this.renderCoursesCarrer()}
                    {this.returnCourseSchedule()}
                    {this.renderCourses()}
                    {this.renderSchedule()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ calc }) => {
    return {
        calc: calc
    };
};

export default connect(mapStateToProps, {
    getSchedules,
    getCoursesCalcDashboard,
    getCoursesCareers,
    returnCourseSchedule
})(DashboardCalc);