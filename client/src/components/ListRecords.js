import React, { Fragment, useEffect, useState } from "react"
import EditRecord from "./EditRecord"

const ListRecords = () => {
    const [records, setRecords] = useState([])

    //del func
    const deleteRecord = async (id) => {
        try {
            const deleteRecord = await fetch(`/records/${id}`, {
                method: "DELETE"
            })
            setRecords(records.filter(record => record.recordID !== id))
        } catch (error) {
            console.log(error.message)
        }
    }

    const getRecords = async () => {
        try {
            const response = await fetch("/records")
            const jsonData = await response.json()
            setRecords(jsonData)
            sortTable()
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getRecords()
    }, [])

    const sortTable = () => {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    return <Fragment>
        <h1 className="mt-5">All Records</h1>
        <table className="table table-hover" id="myTable" >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Servant email</th>
                    <th>Country</th>
                    <th>Disease Code</th>
                    <th>Total deaths</th>
                    <th>Total patients</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {records.map(record => (
                    <tr key={record.recordID}>
                        <td>{record.recordID}</td>
                        <td>{record.email}</td>
                        <td>{record.cname}</td>
                        <td>{record["disease code"]}</td>
                        <td>{record["total deaths"]}</td>
                        <td>{record["total patients"]}</td>
                        <td><EditRecord record={record} /></td>
                        <td><button className="btn btn-danger"
                            onClick={() => deleteRecord(record.recordID)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
}

export default ListRecords