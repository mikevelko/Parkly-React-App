import React, { Component } from 'react'

export default class ListItem extends Component
{
    constructor(props) {
        super(props)
      }

    render() {
            return (
                <div
                style={{
                    width: '100px',
                    marginBottom: '25px',
                    marginTop:'12px',
                    border: 'solid 1px #000'
    
                }}>
                        <img 
                        style= {{flex:1 , width: 100}} 
                        src={this.props.url}
                        alt="new"
                        />
                    
                    
                </div>
            )
        }
    }