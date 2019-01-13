import React, { Component } from 'react';
import SubComponent from '../common/SubComponent'
import axios from "axios";
import { withRouter } from 'react-router';

class ProjectSettings extends SubComponent {

    constructor(props) {
        super(props);
        this.state = {
             project: {
                 id: null,
                 name: "",
                 description: "",
                 allowedGroups: []
             }
         };
      }

    componentDidMount() {
        super.componentDidMount();
        axios
          .get("/api/project/" + this.props.match.params.project)
          .then(response => {
            const newState = Object.assign({}, this.state, {
              project: response.data
            });
            this.setState(newState);
          })
          .catch(error => console.log(error));
     }


    render() {
        return (
            <div>
                <h1>Name: {this.state.project.name}</h1>
                <h2>Settings</h2>
            </div>
        );
      }

}

export default ProjectSettings;
