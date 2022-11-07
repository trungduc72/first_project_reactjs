import React, { Component, useState } from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import "./Table.css";
import 'primeicons/primeicons.css';
import axios from 'axios';

import { withTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';
import i18n from '../translation/i18n';

export class DataTableBasicDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            displayDelete: false,
            displayEdit: false,
            displayBasic: false,
            id: null,
            name: '',
            project_complete: '',
            address: '',
            date: '',
            phone: "",
            email: "",
            school: ''
        };
    }
    componentDidMount() {
        fetch("https://6358edc4ff3d7bddb99427bd.mockapi.io/data_table_user")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    products: json
                });
            })

        this.setState({ 
            id: localStorage.getItem('id'), 
            name: localStorage.getItem('name'),
            project_complete: localStorage.getItem('project_complete'), 
            address: localStorage.getItem('address'), 
            date: localStorage.getItem('date'), 
            phone: localStorage.getItem('phone'), 
            email: localStorage.getItem('email'), 
            school: localStorage.getItem('school'), 
        }) 
    }
    
    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };
        if (position) {
            state = {
                ...state,
                position
            }
        }
        this.setState(state);
    }
    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }
    handleSubmitCreate = event => {
        axios.post(`https://6358edc4ff3d7bddb99427bd.mockapi.io/data_table_user`, {
            name: this.state.name,
            project_complete: this.state.project_complete,
            address: this.state.address,
            date: this.state.date,
            phone: this.state.phone,
            email: this.state.email,
            school: this.state.school
        })
            .then(res => {
                this.onHide('displayBasic');
                this.componentDidMount();
                console.log(res);
                console.log(res.data);
            })

    }
    handleSubmitOptions = (data) => {
        const [displayDelete, setDisplayDelete] = useState(false);
        const [displayEdit, setDisplayEdit] = useState(false);

        const dialogFuncMap = {
            'displayDelete': setDisplayDelete,
            'displayEdit': setDisplayEdit,
        }
        const onClick = (name, position) => {
            dialogFuncMap[`${name}`](true);
        }
        const onHide = (name) => {
            dialogFuncMap[`${name}`](false);
        }
        const renderFooterDelete = (name) => {
            return (
                <div>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" onClick={() => del(data.id)} autoFocus />
                </div>
            );
        }
        const renderFooterEdit = (name) => {
            return (
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "end"}}>
                    <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" onClick={() => edit(data.id)} autoFocus />
                </div>
            );
        }

        const setData = (data) => {
            let { id, name, project_complete, address, date, phone, email, school } = data;
            localStorage.setItem('id', id);
            localStorage.setItem('name', name);
            localStorage.setItem('project_complete', project_complete);
            localStorage.setItem('address', address);
            localStorage.setItem('date', date);
            localStorage.setItem('phone', phone);
            localStorage.setItem('email', email);
            localStorage.setItem('school', school);
        }

        const getData = () => {
            fetch("https://6358edc4ff3d7bddb99427bd.mockapi.io/data_table_user")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    products: json
                });
            })
        }

        const edit = (id) => {
            axios.put(`https://6358edc4ff3d7bddb99427bd.mockapi.io/data_table_user/${id}`, {
                name: this.state.name,
                project_complete: this.state.project_complete,
                address: this.state.address,
                date: this.state.date,
                phone: this.state.phone,
                email: this.state.email,
                school: this.state.school
            })
                .then(res => {
                    onHide('displayEdit');
                    getData();
                    console.log(res);
                    console.log(res.data);
                });
        }

        const del = (id) => {
            axios.delete(`https://6358edc4ff3d7bddb99427bd.mockapi.io/data_table_user/${id}`)
                .then(() => {
                    onHide('displayDelete');
                    getData();
                    console.log(data);
                });
        }

        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" 
                    onClick={() => {
                        setData(data);
                        this.componentDidMount();
                        onClick('displayEdit');
                    }}/>
                <Dialog header="Edit" visible={displayEdit} style={{ width: '40vw' }} footer={renderFooterEdit('displayEdit')} onHide={() => onHide('displayEdit')}>
                    <div className=' p-fluid'>
                        <h5 style={{paddingTop: "20px"}}>Name</h5>
                        <InputText value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        <h5 style={{paddingTop: "20px"}}>Project Complete</h5>
                        <InputText value={this.state.project_complete} onChange={(e) => this.setState({ project_complete: e.target.value })} />
                        <h5 style={{paddingTop: "20px"}}>Address</h5>
                        <InputText value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                        <h5 style={{paddingTop: "20px"}}>Date</h5>
                        <InputText value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} />
                        <h5 style={{paddingTop: "20px"}}>Phone</h5>
                        <InputText value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                        <h5 style={{paddingTop: "20px"}}>Email</h5>
                        <InputText value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                        <h5 style={{paddingTop: "20px"}}>School</h5>
                        <InputText value={this.state.school} onChange={(e) => this.setState({ school: e.target.value })} />
                    </div>
                </Dialog>

                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => onClick('displayDelete')} />
                <Dialog header="Delete" visible={displayDelete} style={{ width: '25vw' }} footer={renderFooterDelete('displayDelete')} onHide={() => onHide('displayDelete')}>
                    <p>Delete?</p>
                </Dialog>
            </React.Fragment>
        );
    }
    customChip(item) {
        return (
            <div>
                <span>{item} - (active) </span>
                <i className="pi pi-user-plus" style={{ fontSize: '14px' }}></i>
            </div>
        );
    }

    changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    render() {
        // const { t } = this.props

        const header = (
            <div className="table-header">
                {/* <h3 className="mx-0 my-1"> {t('content.header')} </h3>
                <Trans i18nKey='content.header' /> */}
                <Translation>{ (t, { i18n }) => <h3 className="mx-0 my-1">{t('content.header')}</h3> }</Translation>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" placeholder= "Search..." />
                </span>
                <div>
                    <Button onClick={() => this.onClick('displayBasic')}><i className="pi pi-user-plus" style={{ marginRight: "10px" }}></i>
                        <Translation>{ (t, { i18n }) => <p className="mx-0 my-1">{t('content.create')}</p> }</Translation>
                    </Button>
                    <Dialog header="Create Data" visible={this.state.displayBasic} style={{ width: '40vw' }} onHide={() => this.onHide('displayBasic')}>
                        <div className=' p-fluid'>
                            <h5 style={{paddingTop: "20px"}}>Name</h5>
                            <InputText onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name"/>
                            <h5 style={{paddingTop: "20px"}}>Project Complete</h5>
                            <InputText onChange={(e) => this.setState({ project_complete: e.target.value })} placeholder="Project Complete"/>
                            <h5 style={{paddingTop: "20px"}}>Address</h5>
                            <InputText onChange={(e) => this.setState({ address: e.target.value })} placeholder="Address"/>
                            <h5 style={{paddingTop: "20px"}}>Date</h5>
                            <InputText onChange={(e) => this.setState({ date: e.target.value })} placeholder="Date"/>
                            <h5 style={{paddingTop: "20px"}}>Phone</h5>
                            <InputText onChange={(e) => this.setState({ phone: e.target.value })} placeholder="Phone"/>
                            <h5 style={{paddingTop: "20px"}}>Email</h5>
                            <InputText onChange={(e) => this.setState({ email: e.target.value })} placeholder="Email"/>
                            <h5 style={{paddingTop: "20px"}}>School</h5>
                            <InputText onChange={(e) => this.setState({ school: e.target.value })} placeholder="School"/>
                        </div>
                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "end"}}>
                            <Button label="Cancel" icon="pi pi-times" onClick={() => this.onHide('displayBasic')} className="p-button-text" />
                            <Button label="Create" icon="pi pi-check" onClick={() => this.handleSubmitCreate()} type='submit' autoFocus />
                        </div>
                    </Dialog>
                </div>
                <div className="d-flex align-items-center">
                    <select onChange={this.changeLanguage}>
                        <option value="vi">
                            Vietnamese
                        </option>
                        <option value="en">
                            English
                        </option>
                    </select>
                </div>
            </div>
        );
        return (
            <div>
                <div className="datatable-crud-demo">
                    <div className='card'>
                        <DataTable value={this.state.products} responsiveLayout="scroll" dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]} 
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" header={header}>
                            <Column field="id" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.code')}</p>}</Translation>}></Column>
                            <Column field="name" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.name')}</p>}</Translation>}></Column>
                            <Column field="project_complete" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.project_complete')}</p>}</Translation>}></Column>
                            <Column field="address" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.address')}</p>}</Translation>}></Column>
                            <Column field="date" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.date')}</p>}</Translation>}></Column>
                            <Column field="phone" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.phone')}</p>}</Translation>}></Column>
                            <Column field="email" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.email')}</p>}</Translation>}></Column>
                            <Column field="school" header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.school')}</p>}</Translation>}></Column>
                            <Column header= {<Translation>{(t, { i18n }) => <p style={{marginBottom: '0'}}>{t('content.options')}</p>}</Translation>} body={this.handleSubmitOptions}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(DataTableBasicDemo)
