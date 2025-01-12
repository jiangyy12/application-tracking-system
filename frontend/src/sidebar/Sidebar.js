import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import '../static/Sidebar.css'
export default class Sidebar extends Component {
    render() {
        return (
            <div className="left-nav">
                <div className="left-nav-item">
                    <div onClick={() => this.props.switchPage('ApplicationPage')}>
                        <i className="fas fa-columns left-nav-icon" ></i>
                    </div>
                    <div onClick={() => this.props.switchPage('SearchPage')}>
                        <i className="fas fa-search left-nav-icon"></i>
                    </div>
                    <div onClick={() => this.props.switchPage('Login')}>
                        <i className="fas fa-sign-in-alt left-nav-icon"></i>
                    </div>
                    <div onClick={() => this.props.switchPage('ApplicationSummaryPage')}>
                        <i className="fas fa-table left-nav-icon"></i>
                    </div>
                    <div onClick={() => this.props.switchPage('SchoolPage')}>
                        <i className="fas fa-sort-alpha-down left-nav-icon"></i>
                    </div>
                </div>
            </div>
        );
    }
}
