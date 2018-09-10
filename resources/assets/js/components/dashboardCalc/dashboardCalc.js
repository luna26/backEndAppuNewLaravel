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
    deleteCourseCaereer,
    addScheduleCourse,
    deleteScheduleCourse,
    newCourse,
    deleteCourseCalc,
    getDays,
    addSchedule,
    deleteSchedule,
    getInfoCalculator,
    updateInfoCalculator
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
            modalCourseSchedule: false,
            scheduleCourse: '',
            courseSchedule: '',
            scheduleCourseSelected: '',
            courseScheduleSelected: '',
            openAddCourseModal: false,
            newCourseCode: '',
            newCourseName: '',
            newCourseCredits: 0,
            addScheduleModal: false,
            infoScheduleInput: '',
            dayScheduleSelected: null,
            value_credit: '',
            enroll_value: '',
            info_credits_payoff: '',
            info_id_estudent_cost: '',
            info_payoff_first_enroll_credit: '',
            info_payoff_first_enroll_cash: '',
            info_enroll_discount: ''

        }
    }

    componentWillMount() {
        this.props.getSchedules();
        this.props.getCoursesCalcDashboard();
        this.props.getCoursesCareers();
        this.props.returnCourseSchedule();
        this.props.loadCareersCalc();
        this.props.getDays();
        this.props.getInfoCalculator();
    }

    openModalAddCourse(option) {
        this.setState({
            openAddCourseModal: option
        });
    }

    onInputChangeCourseCode(term) {
        this.setState({
            newCourseCode: term
        });
    }

    onInputChangeCourseName(term) {
        this.setState({
            newCourseName: term
        });
    }

    onInputChangeCourseCredits(term) {
        this.setState({
            newCourseCredits: term
        });
    }

    createCourse() {
        this.props.newCourse(this.state.newCourseCode, this.state.newCourseName, this.state.newCourseCredits);
    }

    addCourseModal() {
        if (this.state.openAddCourseModal) {
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Agregar Curso</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                <div>
                                    <input
                                        placeholder='Codigo del curso'
                                        value={this.state.newCourseCode}
                                        onChange={event => this.onInputChangeCourseCode(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Nombre del curso'
                                        value={this.state.newCourseName}
                                        onChange={event => this.onInputChangeCourseName(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder='Cantidad de creditos'
                                        value={this.state.newCourseCredits}
                                        onChange={event => this.onInputChangeCourseCredits(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.openModalAddCourse.bind(this, false)}>Salir</Button>
                            <Button onClick={this.createCourse.bind(this)} bsStyle="primary">Guardar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            );
        }
    }

    deleteCourse(course_code) {
        this.props.deleteCourseCalc(course_code);
    }

    renderCourses() {
        if (this.props.calc.courses) {
            return (
                <div className='container-info-calc'>
                    <p>Información de cursos</p>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Curso</th>
                                <th scope="col">Créditos</th>
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
                                            <th scope="row"><button onClick={this.deleteCourse.bind(this, item.course_code)} className='btn btn-danger'>Eliminar</button></th>
                                        </tr>
                                    );
                                }.bind(this))
                            }

                        </tbody>
                    </table>
                    <button onClick={this.openModalAddCourse.bind(this, true)} className='btn btn-warning'>Agregar</button>
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

    openAddScheduleModal(param) {
        this.setState({
            addScheduleModal: param
        });
    }

    onSelectedDay(day) {
        this.setState({
            dayScheduleSelected: day
        });
    }

    onInputChangeScheduleInfo(term) {
        this.setState({
            infoScheduleInput: term
        });
    }

    addSchedule() {
        this.props.addSchedule(this.state.dayScheduleSelected, this.state.infoScheduleInput);
    }

    onDeleteSchedule(schedule_id) {
        this.props.deleteSchedule(schedule_id);
    }

    addScheduleModal() {
        if (this.state.addScheduleModal && this.props.calc.days) {
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Agregar Horario</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                <DropdownButton
                                    title={'Dia'}
                                    key={1}
                                    id={`dropdown-basic-${1}`}
                                >
                                    {
                                        this.props.calc.days.map(function (item, index) {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    eventKey={item.day_id}
                                                    onSelect={this.onSelectedDay.bind(this, item.day_id)}
                                                >
                                                    {item.day_name}
                                                </MenuItem>
                                            );
                                        }.bind(this))
                                    }
                                </DropdownButton>
                                <div>
                                    <input
                                        placeholder='Informacion de horario'
                                        value={this.state.infoScheduleInput}
                                        onChange={event => this.onInputChangeScheduleInfo(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.openAddScheduleModal.bind(this, false)}>Salir</Button>
                            <Button onClick={this.addSchedule.bind(this)} bsStyle="primary">Guardar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            );
        }
    }


    renderSchedule() {
        if (this.props.calc.schedules) {
            return (
                <div className='container-info-calc'>
                    <p>Información de horarios</p>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Día</th>
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
                                            <th scope="row"><button onClick={this.onDeleteSchedule.bind(this, item.schedule_id)} className='btn btn-danger'>Eliminar</button></th>
                                        </tr>
                                    );
                                }.bind(this))
                            }

                        </tbody>
                    </table>
                    <button onClick={this.openAddScheduleModal.bind(this, true)} className='btn btn-warning'>Agregar</button>
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

    reloadCareerCourses() {
        if (this.props.calc.reloadCoursesCareer) {
            this.props.getCoursesCareers();
            this.props.returnCourseSchedule();
            this.props.getCoursesCalcDashboard();
            this.props.getSchedules();
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

    deleteCourseCaereer(idCourse, idCareer) {
        this.props.deleteCourseCaereer(idCareer, idCourse);
    }

    renderCoursesCarrer() {
        let actualCareer;
        if (this.props.calc.coursesCareer) {
            return (
                <div className='container-info-calc'>
                    <p>Información de Carreras/Cursos</p>

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
                                                        <th scope="col">Código del curso</th>
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
                                                                        <th scope="row"><button onClick={this.deleteCourseCaereer.bind(this, item1.course_code, item.careers_id)} className='btn btn-danger'>Eliminar</button></th>
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

    onSelectedCourseSchedule(name, event) {
        this.setState({
            scheduleCourse: name,
            courseScheduleSelected: event
        });
    }

    onSelectedScheduleCourse(name, event) {
        this.setState({
            courseSchedule: name,
            scheduleCourseSelected: event
        });
    }

    showModalScheduleCourse(option) {
        this.setState({
            modalCourseSchedule: option
        });
    }

    addScheduleCourse() {
        this.props.addScheduleCourse(this.state.scheduleCourseSelected, this.state.courseScheduleSelected);
    }

    returnCoursesScheduleModal() {
        if (this.state.modalCourseSchedule && this.props.calc.scheduleCareer && this.props.calc.courses) {
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Agregar horario a curso</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                {/* <p>{this.props.calc.coursesCarrerError}</p> */}
                            </div>
                            <DropdownButton
                                title={'Horarios'}
                                key={1}
                                id={`dropdown-basic-${1}`}
                            >
                                {
                                    this.props.calc.schedules.map(function (item, index) {
                                        return (
                                            <MenuItem
                                                key={index}
                                                eventKey={item.schedule_id}
                                                onSelect={this.onSelectedScheduleCourse.bind(this, item.schedule_id)}
                                            >
                                                {item.schedule_id}
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
                                                onSelect={this.onSelectedCourseSchedule.bind(this, item.course_name)}
                                            >
                                                {item.course_name}
                                            </MenuItem>
                                        );
                                    }.bind(this))
                                }
                            </DropdownButton>
                            <div>
                                <p>{this.state.courseSchedule}</p>
                            </div>
                            <div>
                                <p>{this.state.scheduleCourse}</p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.showModalScheduleCourse.bind(this, false)}>Salir</Button>
                            <Button onClick={this.addScheduleCourse.bind(this)} bsStyle="primary">Guardar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            );
        }
    }

    deleteScheduleCourse(schedule_id, course_id) {
        this.props.deleteScheduleCourse(schedule_id, course_id);
    }

    returnCourseSchedule() {
        let actualCareer;
        if (this.props.calc.scheduleCareer) {
            return (
                <div className='container-info-calc'>
                    <p>Información de Horarios/Cursos</p>
                    <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">

                        {
                            this.props.calc.scheduleCareer.map(function (item, index) {
                                if (actualCareer != item.course_code) {
                                    actualCareer = item.course_code
                                    return (
                                        <Tab key={index} eventKey={index} title={item.course_name}>
                                            <table className="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Día</th>
                                                        <th scope="col">Información de horario</th>
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
                                                                        <th scope="row"><button onClick={this.deleteScheduleCourse.bind(this, item1.schedule_id, item.course_code)} className='btn btn-danger'>Eliminar</button></th>
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
                    <button onClick={this.showModalScheduleCourse.bind(this, true)} className='btn btn-warning'>Agregar</button>
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

    setValuesCalculator(input) {
        switch (input) {
            case 1:
                if (this.state.value_credit != '') {
                    return this.state.value_credit
                } else {
                    return this.props.calc.calculatorInfo.info_credit_value;
                }

            case 2:
                if (this.state.enroll_value != '') {
                    return this.state.enroll_value
                } else {
                    return this.props.calc.calculatorInfo.info_enroll;
                }
            case 3:
                if (this.state.info_id_estudent_cost != '') {
                    return this.state.info_id_estudent_cost
                } else {
                    return this.props.calc.calculatorInfo.info_id_estudent_cost;
                }
            case 4:
                if (this.state.info_payoff_first_enroll_credit != '') {
                    return this.state.info_payoff_first_enroll_credit
                } else {
                    return this.props.calc.calculatorInfo.info_payoff_first_enroll_credit;
                }
            case 5:
                if (this.state.info_payoff_first_enroll_cash != '') {
                    return this.state.info_payoff_first_enroll_cash
                } else {
                    return this.props.calc.calculatorInfo.info_payoff_first_enroll_cash;
                }
            case 6:
                if (this.state.info_enroll_discount != '') {
                    return this.state.info_enroll_discount
                } else {
                    return this.props.calc.calculatorInfo.info_enroll_discount;
                }
            case 7:
                if (this.state.info_credits_payoff != '') {
                    return this.state.info_credits_payoff
                } else {
                    return this.props.calc.calculatorInfo.info_credits_payoff;
                }
        }
    }

    onInputChangeCreditValue(term) {
        this.setState({
            value_credit: term
        });
    }

    onInputChangeEnrollValue(term) {
        this.setState({
            enroll_value: term
        });
    }

    onInputChangeStudentIdValue(term) {
        this.setState({
            info_id_estudent_cost: term
        });
    }

    onInputChangePayoffCreditValue(term) {
        this.setState({
            info_payoff_first_enroll_credit: term
        });
    }

    onInputChangePayoffCashValue(term) {
        this.setState({
            info_payoff_first_enroll_cash: term
        });
    }

    onInputChangePayoffEnroll(term) {
        this.setState({
            info_enroll_discount: term
        });
    }

    onInputChangeCreditsToPayoff(term) {
        this.setState({
            info_credits_payoff: term
        });
    }

    updateCalcInfo() {

        let value1, value2, value3, value4, value5, value6, value7;

        if (this.state.value_credit == '') {
            value1 = this.props.calc.calculatorInfo.info_credit_value;
        } else {
            value1 = this.state.value_credit
        }

        if (this.state.enroll_value == '') {
            value2 = this.props.calc.calculatorInfo.info_enroll;
        } else {
            value2 = this.state.enroll_value
        }

        if (this.state.info_credits_payoff == '') {
            value3 = this.props.calc.calculatorInfo.info_credits_payoff;
        } else {
            value3 = this.state.info_credits_payoff
        }

        if (this.state.info_id_estudent_cost == '') {
            value4 = this.props.calc.calculatorInfo.info_id_estudent_cost;
        } else {
            value4 = this.state.info_id_estudent_cost
        }

        if (this.state.info_payoff_first_enroll_credit == '') {
            value5 = this.props.calc.calculatorInfo.info_payoff_first_enroll_credit;
        } else {
            value5 = this.state.info_payoff_first_enroll_credit
        }

        if (this.state.info_payoff_first_enroll_cash == '') {
            value6 = this.props.calc.calculatorInfo.info_payoff_first_enroll_cash;
        } else {
            value6 = this.state.info_payoff_first_enroll_cash
        }

        if (this.state.info_enroll_discount == '') {
            value7 = this.props.calc.calculatorInfo.info_enroll_discount;
        } else {
            value7 = this.state.info_enroll_discount
        }

        this.props.updateInfoCalculator(value1, value2, value3, value4, value5, value6, value7);

    }

    returnOptionsCalc() {
        if (this.props.calc.calculatorInfo) {
            return (
                <div className='calc-info-options-container'>
                    <div className='field-calc-option'>
                        <label>Valor del crédito.</label>
                        <input
                            value={this.setValuesCalculator(1)}
                            onChange={event => this.onInputChangeCreditValue(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <label>Valor de la matrícula.</label>
                        <input
                            value={this.setValuesCalculator(2)}
                            onChange={event => this.onInputChangeEnrollValue(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <label>Valor del carné estudiantil.</label>
                        <input
                            value={this.setValuesCalculator(3)}
                            onChange={event => this.onInputChangeStudentIdValue(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <label>Porcentaje de descuento primer ingreso (Pago a crédito)</label>
                        <input
                            value={this.setValuesCalculator(4)}
                            onChange={event => this.onInputChangePayoffCreditValue(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <label>Porcentaje de descuento primer ingreso (Pago a contado)</label>
                        <input
                            value={this.setValuesCalculator(5)}
                            onChange={event => this.onInputChangePayoffCashValue(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <label>Descuento en Matrícula primer ingreso.</label>
                        <input
                            value={this.setValuesCalculator(6)}
                            onChange={event => this.onInputChangePayoffEnroll(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <label>Cantidad de créditos para aplicar descuento (Mayor a)</label>
                        <input
                            value={this.setValuesCalculator(7)}
                            onChange={event => this.onInputChangeCreditsToPayoff(event.target.value)}
                        />
                    </div>
                    <div className='field-calc-option'>
                        <button onClick={this.updateCalcInfo.bind(this)} className='btn btn-info'>Actualizar</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <span>Cargando parámetros de la calculadora</span>
                </div>
            );
        }
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
        // RELOADS
        this.reloadCareerCourses();
        return (
            <div className='container-info'>
                <div>
                    {/* LOADER */}
                    {this.returnLoader()}
                    {/* END LOADER */}
                    {/* Modals */}
                    {this.returnCareerCourseModal()}
                    {this.returnCoursesScheduleModal()}
                    {this.addCourseModal()}
                    {this.addScheduleModal()}
                    {/* END Modals */}

                    {this.returnOptionsCalc()}
                    {this.renderCourses()}
                    {this.renderSchedule()}
                    {this.renderCoursesCarrer()}
                    {this.returnCourseSchedule()}
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
    deleteCourseCaereer,
    addScheduleCourse,
    deleteScheduleCourse,
    newCourse,
    deleteCourseCalc,
    getDays,
    addSchedule,
    deleteSchedule,
    getInfoCalculator,
    updateInfoCalculator
})(DashboardCalc);