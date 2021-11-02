import React, { Component } from 'react';
import Card from '../school/Card';
import CardModal from '../school/CardModal';
import $ from 'jquery'


export default class CardBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schools: [],
            card_titles: [],
            card_class: [],
            showModal:false
        }
        this.getInitData = this.getInitData.bind(this);
        this.groupSchool = this.groupSchool.bind(this);
        this.createCardTitle = this.createCardTitle.bind(this);
        this.createCardClass = this.createCardClass.bind(this);
    }

    // get initial data to render the root page
    getInitData(){
        return $.ajax({
            url: 'http://localhost:5000/school',
            method: 'GET'
        })
    }

    componentDidMount(){
        // fetch the data only after this component is mounted
        this.getInitData()
            .done((data) => {
                data = JSON.parse(data);
                let result = this.groupSchool(data);
                let card_titles = this.createCardTitle(result);
                let card_class = this.createCardClass(result);
                this.setState({
                    schools: data,
                    card_titles: card_titles,
                    card_class: card_class
                })
            })
    }

    // the update function for child component
    updateCardBoard(school){
        let newSchools = this.state.schools
        if (school.id >= newSchools.length){
            // current school is a new school, create a new one and save in the backend.
            newSchools.push(school)

            $.ajax({
                url: 'http://localhost:5000/school',
                method: 'POST',
                data:JSON.stringify({
                    school: school
                }),
                contentType: 'school/json',
                success: (msg)=>{
                    alert(msg);
                }
            })
        }else{
            newSchools[school.id] = school
        }

        // rerender the page to represent the update result
        let result = this.groupSchool(newSchools);
        let card_titles = this.createCardTitle(result);
        let card_class = this.createCardClass(result);

        this.setState({
            schools: newSchools,
            card_titles: card_titles,
            card_class: card_class,
            showModal:false,
            school: null
        })
    }

    getNewId() {
        return $.ajax({
            async: false,
            url: 'http://localhost:5000/getNewId',
            method: 'GET'
        })
    }

    // open the card modal according to the school in parameter
    showEditModal(school, mode) {
        let modalMode = mode
        if (!school.id){
            // if the school lacks id meaning it is new record.
            this.getNewId().done((newID=>{
                school.id = newID
            }))
        }

        this.setState({
            showModal: true,
            school: school,
            modalMode: modalMode
        })
    }

    closeEditModal() {
        this.setState({
            showModal: false,
            school: null
        })
    }

    // create all cards(school) and make cards having the same class in the same column
    createCardClass(schools_group) {
        return schools_group.reduce((pv, v) => {
            let app_class = <div className="col" key={v.title + "_class"} id={v.title + "_class"}>
                {v.schools.reduce((pv, v) => {
                    let card = <Card school={v} key={v.id} showEditModal={this.showEditModal.bind(this, v, 'update')} />
                    pv.push(card)
                    return pv
                }, [])}
                {/* add function not implement */}
                <div className="card card-col">
                    <div className="card-body new-col" onClick={this.showEditModal.bind(this, {class: v.class}, 'create')}>
                        <i className="fas fa-plus text-center"></i>
                    </div>
                </div>
            </div>
            pv.push(app_class)
            return pv
        }, [])
    }

    // create the class title
    createCardTitle(schools_group) {
        return schools_group.reduce((pv, v) => {
            let title = <div className="col" key={v.title + "_title"}>
                <div className="card card-col">
                    <div className="card-body noPadding">
                        <div type="text" className="text-center title-col form-control-lg" >
                            {v.title}
                        </div>
                    </div>
                </div>
            </div>
            pv.push(title);
            return pv;
        }, [])
    }

    // initialize the data, classify data according to their class
    groupSchool(schools) {
        let result = [
            {
                title: 'Wish list',
                schools: [],
                class: "1"
            }, {
                title: 'Waiting for referral',
                schools: [],
                class: "2"
            }, {
                title: 'Applied',
                schools: [],
                class: "3"
            }, {
                title: 'Rejected',
                schools: [],
                class: "4"
            }
        ]
        schools.forEach(app => {
            let app_class = result.find(v => { return v.class === app.class })
            app_class.schools.push(app)
        })
        return result;
    }

    render() {
        let schoolModal = null
        if (this.state.school){
            schoolModal = <CardModal show={this.state.showModal} submitFunc={this.updateCardBoard.bind(this)}  mode={this.state.modalMode} school={this.state.school} closeEditModal={this.closeEditModal.bind(this)} />
        }
        return (
            <span id="tab">
                <div className="row">
                    {this.state.card_titles}
                </div>
                <div className="row">
                    {this.state.card_class}
                </div>
                {schoolModal}
            </span>
        )
    }
}