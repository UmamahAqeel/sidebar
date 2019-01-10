import React from 'react';
import '../css/DataTable.css';

const DataTable = (props) => {
    const { persons: data, deletePerson, editPerson, enableEdit, isEnabled } = props;
    return (
        <table className="Table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>{data.map(person => {
                return (
                    <tr key={person.id}>
                        <td></td>
                        <td><input type="text" name={"firstName"} readOnly={isEnabled} defaultValue={person.firstName} onChange={(event) => editPerson(event, person.id)} /></td>
                        <td><input type="text" name={"lastName"} readOnly={isEnabled} defaultValue={person.lastName} onChange={(event) => editPerson(event, person.id)} /></td>
                        <td><input type="text" name={"gender"} readOnly={isEnabled} defaultValue={person.gender} onChange={(event) => editPerson(event, person.id)} /></td>
                        <td>
                            <button className="edit--btn" onClick={() => enableEdit(person.id)}> Edit </button>
                            <button className="delete--btn" onClick={() => deletePerson(person.id)}> Delete </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default DataTable;