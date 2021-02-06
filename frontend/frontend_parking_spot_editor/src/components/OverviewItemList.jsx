import React, { Component } from 'react'
import OverviewItem from './OverviewItem'
import { Redirect, Link } from "react-router-dom";


export default class OverviewItemList extends Component
{
    onPress (id) {
        return;
    }

    render() {
        return (
            <div>
                {this.props.items.map((item) => 
                <Link to={"/Details/:" + item.id}>
                    <OverviewItem onPress={this.onPress} item={item} token={this.props.token}/>
                </Link>
                    )}
            </div>
        )
    }
}