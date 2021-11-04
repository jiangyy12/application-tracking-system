import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
export default class CardEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeEditModal: props.closeEditModal,
            submitFunc: props.submitFunc,
            id: props.school.id,
            schoolName: props.school.schoolName,
            date: props.school.date,
            programTitle: props.school.programTitle,
            class: props.school.class
        }
    }

    // set data to state automatically corresponding to the attribute 'id' of input field
    // ex: <input id = 'date'> => setState({date: value})
    handleChange(event){
        this.setState({ [event.target.id]: event.target.value });
    }

    submitAction(){
        this.state.closeEditModal()
        let school = {
            id: this.state.id,
            schoolName: this.state.schoolName,
            programTitle: this.state.programTitle,
            date: this.state.date,
            class: this.state.class
        }
        // call parent function to handle data change
        this.state.submitFunc(school)

    }

    render() {

        let function_btn = null
        if (this.props.mode === 'update') {
            function_btn = <button type="button" className="btn btn-success" onClick={this.submitAction.bind(this)}>
                Update
            </button>
        }else{
            function_btn = <button type="button" className="btn btn-success" onClick={this.submitAction.bind(this)}>
                Create
            </button>
        }

        let view = !this.props.school ? <div /> : <div>
            <Modal show={this.props.show} onHide={this.state.closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.school.schoolName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="schoolName" className="col-form-label">School Name</label>
                        <input type="text" className="form-control" id="schoolName" value={this.state.schoolName} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="job_title" className="col-form-label">Program Title</label>
                        <input type="text" className="form-control" id="programTitle" value={this.state.programTitle} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="col-form-label">Date</label>
                        <input type="date" className="form-control" id="date" value={this.state.date} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="class">Application Status</label>
                        </div>
                        <select className="custom-select" id="class" value={this.state.class} onChange={this.handleChange.bind(this)}>
                            <option >Choose...</option>
                            <option value="1">Wish list</option>
                            <option value="2">Applied</option>
                            <option value="3">Offered</option>
                            <option value="4">Rejected</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={this.state.closeEditModal}>
                        Close
                    </button>
                    {function_btn}
                </Modal.Footer>
            </Modal>
        </div >
        return view
    }
}