import React, { Component } from 'react'
import OverviewItem from './OverviewItem'
import { Redirect, Link } from "react-router-dom";
import './style.css'

export default class OverviewItemList extends Component
{
    render() {
        return (
            <div className="parking-spots-list">
                {this.props.items.map((item) => 
                <Link to={"/Details/:" + item.id} onClick={() => this.props.onClick(item.id)}>
                    <OverviewItem item={item} token={this.props.token}/>
                </Link>
                    )}
            </div>
        )
    }
}