import React, { Component } from 'react'
import OverviewItem from './OverviewItem'
import { Redirect, Link } from "react-router-dom";
import './style.css'

export default class OverviewItemList extends Component
{
    getPhotos (pp, id)
    {
        pp.forEach(element => {
            if(element[0] == id)
            {
                console.log(element);
                return element[1];
            }
        });
    }

    render() {
        return (
            <div className="parking-spots-list">
                {this.props.items.map((item) => 
                <Link to={"/Details/:" + item.id} onClick={() => this.props.onClick(item.id)}>
                    <OverviewItem item={item} token={this.props.token} photos={() => this.getPhotos(this.props.pagePhotos, item.id)}/>
                </Link>
                    )}
            </div>
        )
    }
}