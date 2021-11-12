import React, { Component } from "react";
import ReactDOM from "react-dom";
import CallService from "./CallService.jsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Calls extends  Component{
    render()
    {

        return (

    <div>
  <Tabs >
    <TabList className="tab">
      <Tab className="tablinks">Call List</Tab>
      <Tab className="tablinks">Archived List</Tab>
    </TabList>

    <TabPanel>
            <CallService isTrashCan={false}/>
    </TabPanel>
    <TabPanel>
    <CallService isTrashCan={true}/>
    </TabPanel>
  </Tabs>
  

  </div>)
  
};
}

export default  Calls;
