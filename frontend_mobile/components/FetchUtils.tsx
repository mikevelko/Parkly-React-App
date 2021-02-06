import React, { useState, useEffect } from 'react';
export async function fetchData(suburl,page,size,sort,booked="", method="GET",body=null){
    const parklyBackendUrl = 'http://localhost:8080';
    try{
      console.log("fetching");
      let url = parklyBackendUrl + suburl + "page=" + page + "&size=" + size +"&sortAscending=" + sort;
      if(booked!="")
      {
          url = url + "&booked=" + booked;
      }
      return fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            Accept: 'application/json',
          'security-header': "ad86d3b4-67d5-11eb-ae93-0242ac130002"
        },
        //body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
      }).then((response) =>{
        return response.json().then((data) => {
          return data;
        })
      })
    }catch(e){
        console.error(e);
    }
}