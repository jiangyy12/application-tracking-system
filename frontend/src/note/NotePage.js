import React, { Component } from 'react';
import Item from './Item';
import ItemModal from './ItemModal';
import $ from 'jquery'


export default class ItemBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            item_titles: [],
            item_class: [],
            showModal:false
        }
        this.getInitData = this.getInitData.bind(this);
        this.groupApplication = this.groupApplication.bind(this);
        this.createItemTitle = this.createItemTitle.bind(this);
        this.createItemClass = this.createItemClass.bind(this);
    }

    // get initial data to render the root page
    getInitData(){
        return $.ajax({
            url: 'http://localhost:5000/note',
            method: 'GET'
        })
    }

    componentDidMount(){
        // fetch the data only after this component is mounted
        this.getInitData()
            .done((data) => {
                data = JSON.parse(data);
                let result = this.groupApplication(data);
                let item_titles = this.createItemTitle(result);
                let item_class = this.createItemClass(result);
                this.setState({
                    notes: data,
                    item_titles: item_titles,
                    item_class: item_class
                })
            })
    }

    // the update function for child component
    updateItemBoard(note){
        let newApplications = this.state.notes
        if (note.id >= newApplications.length){
            // current note is a new note, create a new one and save in the backend.
            newApplications.push(note)

            $.ajax({
                url: 'http://localhost:5000/note',
                method: 'POST',
                data:JSON.stringify({
                    note: note
                }),
                contentType: 'note/json',
                success: (msg)=>{
                    alert(msg);
                }
            })
        }else{
            newApplications[note.id] = note
        }

        // rerender the page to represent the update result
        let result = this.groupApplication(newApplications);
        let item_titles = this.createItemTitle(result);
        let item_class = this.createItemClass(result);

        this.setState({
            notes: newApplications,
            item_titles: item_titles,
            item_class: item_class,
            showModal:false,
            note: null
        })
    }

    getNewId() {
        return $.ajax({
            async: false,
            url: 'http://localhost:5000/getNewId',
            method: 'GET'
        })
    }

    // open the item modal according to the note in parameter
    showEditModal(note, mode) {
        let modalMode = mode
        if (!note.id){
            // if the note lacks id meaning it is new record.
            this.getNewId().done((newID=>{
                note.id = newID
            }))
        }

        this.setState({
            showModal: true,
            note: note,
            modalMode: modalMode
        })
    }

    closeEditModal() {
        this.setState({
            showModal: false,
            note: null
        })
    }

    // create all items(note) and make items having the same class in the same column
    createItemClass(notes_group) {
        return notes_group.reduce((pv, v) => {
            let app_class = <div className="col" key={v.title + "_class"} id={v.title + "_class"}>
                {v.notes.reduce((pv, v) => {
                    let item = <Item note={v} key={v.id} showEditModal={this.showEditModal.bind(this, v, 'update')} />
                    pv.push(item)
                    return pv
                }, [])}
                {/* add function not implement */}
                <div className="item item-col">
                    <div className="item-body new-col" onClick={this.showEditModal.bind(this, {class: v.class}, 'create')}>
                        <i className="fas fa-plus text-center"></i>
                    </div>
                </div>
            </div>
            pv.push(app_class)
            return pv
        }, [])
    }

    // create the class title
    createItemTitle(notes_group) {
        return notes_group.reduce((pv, v) => {
            let title = <div className="col" key={v.title + "_title"}>
                <div className="item item-col">
                    <div className="item-body noPadding">
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
    groupApplication(notes) {
        let result = [
            {
                title: 'Wish list',
                notes: [],
                class: "1"
            }, {
                title: 'Waiting for referral',
                notes: [],
                class: "2"
            }, {
                title: 'Applied',
                notes: [],
                class: "3"
            }, {
                title: 'Rejected',
                notes: [],
                class: "4"
            }
        ]
        notes.forEach(app => {
            let app_class = result.find(v => { return v.class === app.class })
            app_class.notes.push(app)
        })
        return result;
    }

    render() {
        let noteModal = null
        if (this.state.note){
            noteModal = <ItemModal show={this.state.showModal} submitFunc={this.updateItemBoard.bind(this)}  mode={this.state.modalMode} note={this.state.note} closeEditModal={this.closeEditModal.bind(this)} />
        }
        return (
            <span id="tab">
                <div className="row">
                    {this.state.item_titles}
                </div>
                <div className="row">
                    {this.state.item_class}
                </div>
                {noteModal}
            </span>
        )
    }
}