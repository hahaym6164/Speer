import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

// get call list from provided api

let url = "https://aircall-job.herokuapp.com/activities";
let resetUrl = "https://aircall-job.herokuapp.com/reset";
export default class CallService extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount();
    this.state = {
      trashCan: props.isTrashCan,
      getList: [],
    };
  }

  //   archived  the selected call from call list, 
  // unarchived the call when it is already archived
  removeFromList(id, i, index) {
    axios
      .post(`${url}/${id}`, {
        is_archived: !i.is_archived,
      })
      .then((res) => {
        console.log(i.id, "dc", i.is_archived);
        this.componentDidMount();
      })
      .catch((err) => console.log(err));
  }
  // Format the time into Hours and Minute
  correctTime(ip) {
    let time = new Date(ip);
    time = `${time.getHours()}:${time.getMinutes()} ${
      parseInt(time.getHours()) < 11 ? "am" : "pm"
    }`;
    return time;
  }
    //   making get request to get call list
  componentDidMount() {
    axios
      .get(url)
      .then((res) => {
        res.data.map((i) => {
          i.created_at = this.correctTime(i.created_at);
        });
        this.setState({ getList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Make reset http request
  reset() {
    axios
      .get(resetUrl)
      .then((res) => {
        this.componentDidMount();
      })
      .catch((err) => console.log(err));
  }
  render() {
    let { getList } = this.state;
    return (
      <div className="calls">
        
        <button className="reset"
        style={this.state.trashCan ? {display:'block'}: {display:'none'}}
        onClick={this.reset.bind(this)}> Unarchive all

         <i className={"icon fas fa-trash-restore-alt"}></i>
</button>
        
        {/* Call List rendering */}
        {getList.map((i, index) => (
          <div
            key={i.id}
            className="single-call"
            style={
              // show the call list when isTrashCan = false else show archived list
              (this.state.trashCan ?  !i.is_archived:i.is_archived) 
            ? { visibility: "hidden", opacity: 0, maxHeight: 0, padding:'0 15px',   margin: '0'}
                : {visibility: "visible", opacity: 1, maxHeight: '500px', padding:'15px',margin: '15px 0'  }            }
          >
            <div className="time"><span>{i.created_at}</span></div>
            <div className="icon phone"><i className="fas fa-phone-volume"></i></div>

            <div className="from-to"> 
           <div className="from"> <span className="label">From:</span><span>{i.from}</span></div> 
               
              <div className="to"><span className="label">To:</span> <span>{i.to}</span></div>
            </div>
            <button className="icon delete"  onClick={this.removeFromList.bind(this, i.id, i, index)}>
              {/* Icon change by the current tab */}
            <i className={!this.state.trashCan ? "icon fas fa-trash":"fas fa-trash-restore"}></i>



            </button>
          </div>
        ))}

      </div>
    );
  }
}
