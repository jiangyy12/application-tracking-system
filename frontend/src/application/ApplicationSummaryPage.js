import React, { Component } from 'react';
import Card from './Card';
import CardModal from './CardModal';
import $ from 'jquery'
import * as ReactBootstrap from "react-bootstrap";


export default class ApplicationSummaryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // applications: [],
            // card_titles: [],
            // card_class: [],
            // showModal:false
            data: []
            // }
            // this.getInitData = this.getInitData.bind(this);
            // this.groupApplication = this.groupApplication.bind(this);
            // this.createCardTitle = this.createCardTitle.bind(this);
            // this.createCardClass = this.createCardClass.bind(this);
        };
    }

    // get initial data to render the root page
//     getInitData(){
//         return $.ajax({
//             url: 'http://127.0.0.1:5000/applicationSummaryPage',
//             method: 'GET'
//     })
// }


    componentDidMount(){
        // fetch the data only after this component is mounted
        // this.getInitData()
        //     // .then(response => response.json())
        //     .then(data => this.setState({data: data}));
        // var newData = this.state.data.concat([this.state.data]);
        // this.setState({data: newData})


        const apiUrl = 'http://127.0.0.1:5000/applicationSummaryPage';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({data: data}));
        var newData = this.state.data.concat([this.state.data]);
        this.setState({data: newData})
    }



    renderTeam(response, index){
        return(
            <tr key={index}>
                <td>{response.companyName}</td>
                <td>{response.Waiting}</td>
                <td>{response.Offer}</td>
                <td>{response.Rejected}</td>
            </tr>
        )
    }

    // the update function for child component
    // updateCardBoard(application){
    //     let newApplications = this.state.applications
    //     if (application.id >= newApplications.length){
    //         // current application is a new application, create a new one and save in the backend.
    //         newApplications.push(application)
    //
    //         $.ajax({
    //             url: 'http://localhost:5000/application',
    //             method: 'POST',
    //             data:JSON.stringify({
    //                 application: application
    //             }),
    //             contentType: 'application/json',
    //             success: (msg)=>{
    //                 alert(msg);
    //             }
    //         })
    //     }else{
    //         newApplications[application.id] = application
    //     }
    //
    //     // rerender the page to represent the update result
    //     let result = this.groupApplication(newApplications);
    //     let card_titles = this.createCardTitle(result);
    //     let card_class = this.createCardClass(result);
    //
    //     this.setState({
    //         applications: newApplications,
    //         card_titles: card_titles,
    //         card_class: card_class,
    //         showModal:false,
    //         application: null
    //     })
    // }
    //
    // getNewId() {
    //     return $.ajax({
    //         async: false,
    //         url: 'http://localhost:5000/getNewId',
    //         method: 'GET'
    //     })
    // }

    // open the card modal according to the application in parameter
    // showEditModal(application, mode) {
    //     let modalMode = mode
    //     if (!application.id){
    //         // if the application lacks id meaning it is new record.
    //         this.getNewId().done((newID=>{
    //             application.id = newID
    //         }))
    //     }
    //
    //     this.setState({
    //         showModal: true,
    //         application: application,
    //         modalMode: modalMode
    //     })
    // }
    //
    // closeEditModal() {
    //     this.setState({
    //         showModal: false,
    //         application: null
    //     })
    // }

    // create all cards(application) and make cards having the same class in the same column
    // createCardClass(applications_group) {
    //     return applications_group.reduce((pv, v) => {
    //         let app_class = <div className="col" key={v.title + "_class"} id={v.title + "_class"}>
    //             {v.applications.reduce((pv, v) => {
    //                 let card = <Card application={v} key={v.id} showEditModal={this.showEditModal.bind(this, v, 'update')} />
    //                 pv.push(card)
    //                 return pv
    //             }, [])}
    //             {/* add function not implement */}
    //             <div className="card card-col">
    //                 <div className="card-body new-col" onClick={this.showEditModal.bind(this, {class: v.class}, 'create')}>
    //                     <i className="fas fa-plus text-center"></i>
    //                 </div>
    //             </div>
    //         </div>
    //         pv.push(app_class)
    //         return pv
    //     }, [])
    // }
    //
    // // create the class title
    // createCardTitle(applications_group) {
    //     return applications_group.reduce((pv, v) => {
    //         let title = <div className="col" key={v.title + "_title"}>
    //             <div className="card card-col">
    //                 <div className="card-body noPadding">
    //                     <div type="text" className="text-center title-col form-control-lg" >
    //                         {v.title}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         pv.push(title);
    //         return pv;
    //     }, [])
    // }

    // initialize the data, classify data according to their class
    // groupApplication(applications) {
    //     let result = [
    //         {
    //             title: 'Wish list',
    //             applications: [],
    //             class: "1"
    //         }, {
    //             title: 'Waiting for referral',
    //             applications: [],
    //             class: "2"
    //         }, {
    //             title: 'Applied',
    //             applications: [],
    //             class: "3"
    //         }, {
    //             title: 'Rejected',
    //             applications: [],
    //             class: "4"
    //         }
    //     ]
    //     applications.forEach(app => {
    //         let app_class = result.find(v => { return v.class === app.class })
    //         app_class.applications.push(app)
    //     })
    //     return result;
    // }

    render() {
        // let applicationModal = null
        // if (this.state.application){
        //     applicationModal = <CardModal show={this.state.showModal} submitFunc={this.updateCardBoard.bind(this)}  mode={this.state.modalMode} application={this.state.application} closeEditModal={this.closeEditModal.bind(this)} />
        // }
        // return (
        //     <span id="tab">
        //         <div className="row">
        //             {this.state.card_titles}
        //         </div>
        //         <div className="row">
        //             {this.state.card_class}
        //         </div>
        //         {applicationModal}
        //     </span>
        // )
        return (
            <div className="Home" align = 'center'>

                <br/>

                <div className = "test">
                    <div className="formblock" align = 'center'>
                        <ReactBootstrap.Table striped bordered hover>
                            <thead className="thead-dark">
                            <tr>
                                {/*<th>#</th>*/}
                                <th>companyName</th>
                                <th>Waiting</th>
                                <th>Offer</th>
                                <th>Rejected</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(this.renderTeam)}
                            </tbody>
                        </ReactBootstrap.Table>
                    </div>
                </div>
            </div>
        );
    }
}