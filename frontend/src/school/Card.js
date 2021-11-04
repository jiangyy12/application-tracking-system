import React, { Component } from 'react';

let date = [
    {
        class: "1",
        state: "Wish list",
        wordOfDate: "Apply By"
    }, {
        class: "2",
        state: "Applied",
        wordOfDate: "Applied Date"
    }, {
        class: "3",
        state: "Offered",
        wordOfDate: "Decision Due Date"
    }, {
        class: "4",
        state: "Rejected",
        wordOfDate: "Applied Date"
    }
]

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditModal: props.showEditModal
        }

    }

    stopPropagation(e){
        e.stopPropagation()
    }

    render() {
        let dateType = date.find(d =>{
            return d.class === this.props.school.class
        })
        return (
            <div className="card card-col" key={this.state.id+"_card"}  onClick={this.state.showEditModal}>
                <div className="card-body">
                    <div className="card-action">
                        <h6 className="card-title"  onClick={this.stopPropagation}>
                            {this.props.school.programTitle}
                        </h6>
                    </div>
                    <p className="small-content-text" key={this.props.school.schoolName}>
                        {this.props.school.schoolName}<br/>
                        {dateType.wordOfDate}: {this.props.school.date}
                    </p>
                </div>
            </div>
        );
    }
}

export default Card;