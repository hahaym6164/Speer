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
    console.log(time);
    return time;
  }

  componentDidMount() {
    //   making get request to get call list
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        res.data.map((i) => {
          // Formated the time
          i.created_at = this.correctTime(i.created_at);
        });
        this.setState({ getList: res.data });
        // console.log(get.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  reset() {
    axios
      .get(resetUrl)
      .then((res) => {
        console.log(res, "reset");
        // this.setState({ getList: res.data });

        this.componentDidMount();
      })
      .catch((err) => console.log(err));
  }
  render() {
    let { getList } = this.state;
    return (
      <div className="calls">
        <button onClick={this.reset.bind(this)}>Reset</button>
        {getList.map((i, index) => (
          <div
            key={i.id}
            className="single-call"
            style={
              i.is_archived
                ? { visibility: "hidden", opacity: 0, height: 0 }
                : { display: "block" }
            }
          >
            <div className="time">{i.created_at}</div>
            <div className="from-to">
              id: {i.id}
              Caller : {i.from}
              <br />
              To : {i.to}
            </div>
            {console.log(i)}
            <button onClick={this.deleteCall.bind(this, i.id, i, index)}>
              delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}
