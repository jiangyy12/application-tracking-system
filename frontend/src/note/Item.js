import React, { Component } from 'react';

let date = [
    {
        class: "1",
        state: "Wish list",
        wordOfDate: "Apply By"
    }, {
        class: "2",
        state: "Waiting for referral",
        wordOfDate: "Referral before "
    }, {
        class: "3",
        state: "Applied",
        wordOfDate: "Applied Date"
    }, {
        class: "4",
        state: "Rejected",
        wordOfDate: "Applied Date"
    }
]

class Item extends Component {
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
            return d.class === this.props.application.class
        })
        return (
            <div className="item item-col" key={this.state.id+"_item"}  onClick={this.state.showEditModal}>
                <div className="item-body">
                    <div className="item-action">
                        <h6 className="item-title"  onClick={this.stopPropagation}>
                            {this.props.application.jobTitle}
                        </h6>
                    </div>
                    <p className="small-content-text" key={this.props.application.companyName}>
                        {this.props.application.companyName}<br/>
                        {dateType.wordOfDate}: {this.props.application.date}
                    </p>
                </div>
            </div>
        );
    }
}

export default Item;