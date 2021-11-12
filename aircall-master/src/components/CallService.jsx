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
      posts: [],
      getList: [],
    };
  }

  //   getAllCalls() {
  //     axios
  //       .get(url)
  //       .then((res) => {
  //         res.data.map((i) => {
  //           // Formated the time
  //           i.created_at = this.correctTime(i.created_at);
  //         });
  //         this.setState({ getList: res.data });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   delete the selected call
  deleteCall(id, i, index) {
    axios
      .post(`${url}/${id}`, {
        is_archived: true,
      })
      .then((res) => {
        console.log(i.id, "dc", i.is_archived);
        this.componentDidMount();
      })
      .catch((err) => console.log(err));
  }
  correctTime(ip) {
    let time = new Date(ip);
    time = `${time.getHours()}:${time.getMinutes()} ${
      parseInt(time.getHours()) < 11 ? "am" : "pm"
    }`;
    return time;
  }

  componentDidMount() {
    //   making get request to get call list
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
        <button className="reset" onClick={this.reset.bind(this)}> Unarchive all <i className="icon fas fa-trash-restore-alt"></i>

</button>
        
        {/* Call List rendering */}
        {getList.map((i, index) => (
          <div
            key={i.id}
            className="single-call"
            style={
              i.is_archived
                ? { visibility: "hidden", opacity: 0, maxHeight: 0, padding:'0 15px',   margin: '0 15px'}
                : {visibility: "visible", opacity: 1, maxHeight: '500px', padding:'15px',margin: '15px'  }
            }
          >
            <div className="time"><span>{i.created_at}</span></div>
            <div className="icon phone"><i className="fas fa-phone-volume"></i></div>

            <div className="from-to"> 
             <div className="from"><span className="label">From:</span>{i.from}</div> 
               
              <div className="to"><span className="label">To:</span>{i.to}</div>
            </div>
            <button className="icon delete"  onClick={this.deleteCall.bind(this, i.id, i, index)}>
            <i className="fas fa-trash"></i>


            </button>
          </div>
        ))}

      </div>
    );
  }
}
