import React, { Component } from 'react';
import SubComponent from '../common/SubComponent'
import { Link } from 'react-router-dom';
import * as Utils from '../common/Utils';
import { FadeLoader } from 'react-spinners';
import axios from "axios";

class EventsWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
             events:[],
             projectId: ""
         };
      }

      getEvents(){
           axios
               .get("/api/" + this.state.projectId + "/audit?" + Utils.filterToQuery(this.state.filter))
               .then(response => {
                    this.state.events = response.data;
                    this.state.loading = false;
                    this.setState(this.state);
           }).catch(error => {
               Utils.onErrorMessage("Couldn't get events: ", error);
               this.state.loading = false;
               this.setState(this.state);
           });
       }

    componentWillReceiveProps(nextProps) {
        if (nextProps.projectId){
            this.state.projectId = nextProps.projectId;
        }
        if (nextProps.filter){
            this.state.filter = nextProps.filter;
        }
        if (this.state.filter && this.state.projectId){
            this.getEvents();
        }
    }

    render() {
        return (
            <div>
                <div className="col-sm-9">
                  <div className='sweet-loading'>
                         <FadeLoader
                           sizeUnit={"px"}
                           size={100}
                           color={'#135f38'}
                           loading={this.state.loading}
                         />
                   </div>
                  <table class="table">
                      <thead>
                          <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
                            <th>User</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                            this.state.events.map(function(event){
                                return (
                                       <tr className={Utils.getStatusColorClass(event.eventType)}>
                                           <td>{event.eventType}</td>
                                           <td>{Utils.timeToDate(event.createdTime)}</td>
                                           <td>{event.user}</td>
                                       </tr>
                                       );
                            }.bind(this))
                      }
                      </tbody>
                  </table>
                  <div>
                    <a href={ "/" + this.state.projectId + "/audit?" + Utils.filterToQuery(this.state.filter || {})} target="_blank">All Events</a>
                  </div>
              </div>
            </div>

        );
      }


}

export default EventsWidget;
