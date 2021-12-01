import React, { Fragment, useState, useEffect } from "react";

const InputRecord = () => {
    // eslint-disable-next-line
    const [email, setEmail] = useState("")
    const [cname, setCname] = useState("")
    const [dcode, setDcode] = useState("")
    const [deaths, setDeaths] = useState(0)
    const [patients, setPatients] = useState(0)

    const [servants, setServants] = useState([])
    const [countries, setCountries] = useState([])
    const [dcodes, setDcodes] = useState([])

    const getServants = async () => {
        try {
            const response = await fetch("/servants")
            const jsonData = await response.json()
            setServants(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    const getCountries = async () => {
        try {
            const response = await fetch("/countries")
            const jsonData = await response.json()
            setCountries(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    const getDcodes = async () => {
        try {
            const response = await fetch("/dcodes")
            const jsonData = await response.json()
            setDcodes(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { email, cname, dcode, deaths, patients }
            const response = await fetch("/records",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                window.location = "/"
        } catch (error) {
            console.log(error.message)
        } 
    }

    useEffect(() => {
        getServants()
    }, [])

    useEffect(() => {
        getCountries()
    }, [])
    useEffect(() => {
        getDcodes()
    }, [])
    return <Fragment>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <div className="form-control mr-1">
                <select className="form-control" value={email} onChange={e => setEmail(e.target.value)}>
                    {servants.map(servant => {
                        return <option key={servant.email}>{servant.email}</option>
                    })}
                </select>
                <h6 className="mt-1">Choose servant email</h6>
            </div>
            <div className="form-control mr-1">
                <select className="form-control" value={cname} onChange={e => setCname(e.target.value)}>
                {countries.map(country => {
                        return <option key={country.cname}>{country.cname}</option>
                    })}
                </select>
                <h6 className="mt-1">Choose disease country</h6>
                <input type="number" className="form-control" id="deaths" value={deaths} onChange={e => setDeaths(e.target.value)} />
                <h6 className="mt-1">Add total deaths</h6>
            </div>
            <div className="form-control">
                <select className="form-control" value={dcode} onChange={e => setDcode(e.target.value)}>
                {dcodes.map(dcode => {
                        return <option key={dcode["disease code"]}>{dcode["disease code"]}</option>
                    })}
                </select>
                <h6 className="mt-1">Choose disease code</h6>
                <input type="number" className="form-control" id="patients" value={patients} onChange={e => setPatients(e.target.value)} />
                <h6 className="mt-1">Add total patients</h6>
            </div>
            <button className="btn btn-success ml-2">Add Record</button>
        </form>
    </Fragment>
}

export default InputRecord