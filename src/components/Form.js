import React, { Component } from 'react';
import { default as UUID } from "node-uuid";
import DataTable from './DataTable';
import * as _ from 'lodash';

import '../css/Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            country: '',
            visitedCountries: [],
            persons: [],
            editable: false
        };
    }

    /*componentWillMount() {
        console.log('id');
        this.id = UUID.v4();
    }
    //it is generating one id for all elements..*/

    handleFormChanges = (event) => {
        const { target: { value } } = event;
        this.setState({ name: value });
    }

    handleFname = (event) => {
        this.setState({ firstName: event.target.value });
    }

    handleLname = (event) => {
        this.setState({ lastName: event.target.value });
    }

    handleGender = (event) => {
        this.setState({ gender: event.target.value });
    }

    handleCountry = (event) => {
        this.setState({ country: event.target.value });
    }

    handleVisited = (event) => {
        //destructuring event to get value from it (explicitely)
        const { target: { value: visitedCountry } } = event;
        const { visitedCountries = [] } = this.state;
        if (visitedCountries && _.includes(visitedCountries, visitedCountry)) {
            _.remove(visitedCountries, (element) => element === visitedCountry);
        } else {
            visitedCountries.push(visitedCountry);
        }

        this.setState({ visitedCountries });
        //this.setState({visitedCountries: this.state.visitedCountries.push(event.target.value)});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.id = UUID.v4();

        const person = {
            id: this.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            country: this.state.country,
            visitedCountries: this.state.visitedCountries
        };

        const { persons = [] } = this.state;
        persons.push(person);
        this.setState({ persons });
    }

    deletePerson = (personId) => {
        const { persons = [] } = this.state;

        let person = persons.find(person => person.id === personId);

        if (person && _.includes(persons, person)) {
            _.remove(persons, (element) => element === person);
        }

        this.setState({ persons }, () => {
            console.log('Person Deleted!');
        });
    }

    enableEdit = (personId) => {
        this.setState({ editable: true }, () => {
            console.log('Edit Enabled!');
        });
    }

    editPerson = (event, personId) => {
        const { persons = [] } = this.state;
        let person = persons.find(person => person.id === personId);

        //person.firstName = event.target.value;
        const { target: { name, value } } = event;

        if (person && _.includes(persons, person) && this.state.editable === true) {
            person[name] = value;
        }

        this.setState({ persons, editable: false }, () => {
            console.log('Person Edited!');
        });

        /*Debounce below didn't work
        _.debounce(() => {this.setState({ persons, editable: false }, () => {
            console.log('Person Edited!');
        })}, 250);*/
    }

    render() {
        const countries = [
            { id: 1, name: 'Pakistan' },
            { id: 2, name: 'Japan' },
            { id: 3, name: 'Canada' },
            { id: 4, name: 'Scotland' }];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form id="form" className="Form" onSubmit={this.handleSubmit}>
                    <label>
                        <h2>First Name</h2>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFname} />
                        <h2>Last Name</h2>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLname} />
                        <h2>Gender</h2>
                        <input type="radio" name="gender" value="male" onChange={this.handleGender} /> Male
                        <input type="radio" name="gender" value="female" onChange={this.handleGender} /> Female
                        <h2>Country</h2>
                        <div>
                            <select name="country" value={this.state.country} onChange={this.handleCountry}>
                                <option value=""></option>
                                {countries.map((countries, i) =>
                                    (<option key={i} value={countries.name} onChange={this.handleCountry} >{countries.name}</option>))}
                            </select>
                        </div>
                        <h2>Visited Countries</h2>
                        <div>
                            <select name="visitedCountries" multiple value={this.state.visitedCountries} onChange={this.handleVisited}>
                                {countries.map((countries) =>
                                    (<option key={countries.id} value={countries.name}>{countries.name}</option>))}
                            </select>
                        </div>
                    </label>
                    <input className="button" type="submit" value="Save" />
                </form>
                <DataTable persons={this.state.persons} deletePerson={this.deletePerson}
                    enableEdit={this.enableEdit} isEnabled={!this.state.editable} editPerson={this.editPerson} />
            </div>
        );
    }
}