import React, { Fragment, useState } from "react"

const EditRecord = ({ record }) => {
    const [deaths, setDeaths] = useState(record["total deaths"])

    const updateDeaths = async e => {
        e.preventDefault()
        try {
            const body = { deaths }
            const response = await fetch(`/records/deaths/${record.recordID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (error) {
            console.log(error.message)
        }
    }

    return <Fragment>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${record.recordID}`}>
            Edit
        </button>

        <div className="modal" id={`id${record.recordID}`} onClick={() => setDeaths(record["total deaths"])}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit record</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDeaths(record["total deaths"])}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <h6>Edit total deaths</h6>
                        <input type="number" className="form-control" value={deaths}
                            onChange={e => setDeaths(e.target.value)}></input>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-warning"
                            data-dismiss="modal"
                            onClick={e => updateDeaths(e)}>Edit</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
}

export default EditRecord