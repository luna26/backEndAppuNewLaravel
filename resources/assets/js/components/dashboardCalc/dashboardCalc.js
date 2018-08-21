import React, { Component } from 'react';
import { connect } from 'react-redux';
import { URL_SERVER } from '../../config';
import {
    getSchedules,
    getCoursesCalcDashboard,
    getCoursesCareers,
    returnCourseSchedule,
    addCareersCourse,
    loadCareersCalc,
    reloadCoursesCareer,
    deleteCourseCaereer
} from '../../actions';
import {
    Tab,
    Tabs,
    Modal,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';

class DashboardCalc extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalCareerCourse: false,
            careerCourseSelected: '',
            courseCareerSelected: '',
            careerCourseNameSelected: '',
            courseCareerNameSelected: '',
        }
    }

    componentWillMount() {
        this.props.getSchedules();
        this.props.getCoursesCalcDashboard();
        this.props.getCoursesCareers();
        this.props.returnCourseSchedule();
        this.props.loadCareersCalc();
    }

    renderCourses() {
        if (this.props.calc.courses) {
            return (
                <div className='container-info-calc'>
                    <p>Informacion de cursos</p>
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
                    <button className='btn btn-warning'>Agregar</button>
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
                <div className='container-info-calc'>
                    <p>Informacion de horarios</p>
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
                    <button className='btn btn-warning'>Agregar</button>
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

    addCareerCourseModal(option) {
        this.setState({
            modalCareerCourse: option
        });
    }

    addCareerCourse() {
        this.props.addCareersCourse(this.state.careerCourseSelected, this.state.courseCareerSelected);
    }

    onSelectedCareer(name, event) {
        this.setState({
            careerCourseNameSelected: name,
            careerCourseSelected: event
        });
    }

    onSelectedCourse(name, event) {
        this.setState({
            courseCareerSelected: event,
            courseCareerNameSelected: name
        });
    }

    reloadCareerCourses(){
        if(this.props.calc.reloadCoursesCareer){
            this.props.getCoursesCareers();
        }
    }

    returnCareerCourseModal() {
        if (this.state.modalCareerCourse && this.props.calc.careers && this.props.calc.courses) {
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Agregar curso a carrera</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                <p>{this.props.calc.coursesCarrerError}</p>
                            </div>
                            <DropdownButton
                                title={'Carreras'}
                                key={1}
                                id={`dropdown-basic-${1}`}
                            >
                                {
                                    this.props.calc.careers.map(function (item, index) {
                                        return (
                                            <MenuItem
                                                key={index}
                                                eventKey={item.careers_id}
                                                onSelect={this.onSelectedCareer.bind(this, item.careers_title)}
                                            >
                                                {item.careers_title}
                                            </MenuItem>
                                        );
                                    }.bind(this))
                                }
                            </DropdownButton>
                            <DropdownButton
                                title={'Cursos'}
                                key={2}
                                id={`dropdown-basic-${2}`}
                            >

                                {
                                    this.props.calc.courses.map(function (item, index) {
                                        return (
                                            <MenuItem
                                                key={index}
                                                eventKey={item.course_code}
                                                onSelect={this.onSelectedCourse.bind(this, item.course_name)}
                                            >
                                                {item.course_name}
                                            </MenuItem>
                                        );
                                    }.bind(this))
                                }
                            </DropdownButton>
                            <div>
                                <p>{this.state.careerCourseNameSelected}</p>
                            </div>
                            <div>
                                <p>{this.state.courseCareerNameSelected}</p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.addCareerCourseModal.bind(this, false)}>Salir</Button>
                            <Button onClick={this.addCareerCourse.bind(this)} bsStyle="primary">Guardar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            );
        }
    }

    deleteCourseCaereer(idCourse, idCareer){
        console.log(idCourse, 'idCourse');
        console.log(idCareer, 'idCareer');

        this.props.deleteCourseCaereer(idCareer, idCourse);
    }

    renderCoursesCarrer() {
        let actualCareer;
        if (this.props.calc.coursesCareer) {
            return (
                <div className='container-info-calc'>
                    <p>Informacion de Carreras/Cursos</p>

                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

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
                                                                        <th scope="row"><button onClick={this.deleteCourseCaereer.bind(this, item1.course_code, item.careers_id)}className='btn btn-danger'>Eliminar</button></th>
                                                                    </tr>
                                                                )
                                                            }

                                                        }.bind(this))
                                                    }
                                                </tbody>
                                            </table>
                                        </Tab>
                                    );
                                }
                            }.bind(this))
                        }

                    </Tabs>
                    <button onClick={this.addCareerCourseModal.bind(this, true)} className='btn btn-warning'>Agregar</button>
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
        if (this.props.calc.scheduleCareer) {
            return (
                <div className='container-info-calc'>
                    <p>Informacion de Horarios/Cursos</p>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">

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
                    <button className='btn btn-warning'>Agregar</button>
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
        // RELOADS
        this.reloadCareerCourses();
        return (
            <div className='container-info'>
                <div>
                    {/* Modals */}
                    {this.returnCareerCourseModal()}
                    {/* END Modals */}

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
    returnCourseSchedule,
    addCareersCourse,
    loadCareersCalc,
    reloadCoursesCareer,
    deleteCourseCaereer
})(DashboardCalc);