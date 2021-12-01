import React, { Fragment, useEffect, useState } from "react"

const FindAverage = () => {
    const [records, setRecords] = useState([])
    const [countryAvg, setCountryAvg] = useState([])
    const [specialization, setSpecialization] = useState("")
    const getRecords = async () => {
        try {
            const response = await fetch(`/descriptions`)
            const jsonData = await response.json()
            setRecords(jsonData)
            setSpecialization(records[0].description)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        getRecords()
    }, [])

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { specialization }
            const response = await fetch(`/findAVG/${specialization}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
            const jsonData = await response.json()
            setCountryAvg(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    const changeStuff = (value) => {
        setSpecialization(value)
        setCountryAvg([])
    }

    return <Fragment>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <div className="form-control mr-1">
                <select className="form-control" value={specialization} 
                onChange={e => changeStuff(e.target.value)}>
                    {records.map(record => {
                        return <option key={record.description}>{record.description}</option>
                    })}
                </select>
                <h6 className="mt-1">Choose specialization</h6>
            </div>
            <button className="btn btn-info ml-2">Find Average Salaries for all countries</button>
        </form>
        <div>
    <h4 className="mt-5">Country averages for {specialization} diseases</h4>
    <table className="table table-hover" id="myTable" >
        <thead>
            <tr>
                <th>Country</th>
                <th>Average Salary</th>
            </tr>
        </thead>
        <tbody>
            {countryAvg.map(record => (
                <tr key={record.cname}>
                    <td>{record.cname}</td>
                    <td>{record.avg? parseFloat(record.avg).toFixed(2) : 0}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </Fragment>
}

export default FindAverage