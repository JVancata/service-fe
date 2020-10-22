import React from 'react';
import { format } from 'date-fns'
import { stringStatus, STATUS_ERROR, STATUS_OK } from '../enum/statuses';


function Service({ name, id, logs }) {
    //const lastLog = logs && logs[0] ? logs[0] : null;

    const getStatus = (service_status) => {
        let badgeClass = null;
        switch (service_status) {
            case STATUS_OK:
                badgeClass = "badge-success";
                break;
            case STATUS_ERROR:
                badgeClass = "badge-danger";
                break;
            default:
                badgeClass = "badge-secondary";
                break;
        }
        return <span className={`badge ${badgeClass}`}>
            {stringStatus[service_status] ? stringStatus[service_status] : service_status}
        </span>;
    }

    const renderLogRow = (log) => {
        if (!log) return;
        const { inserted_at, service_status, id } = log;
        const date = new Date(inserted_at);

        return (
            <tr key={`log-id-${id}`}>
                <td>{format(date, "HH:mm:ss dd. MM.")}</td>
                <td>{getStatus(service_status)}</td>
            </tr>
        );
    }

    return (
        <div key={`${id}-${name}`} className="row col-6 pb-5">
            <div className="col-6">
                <h1>{name}</h1>
            </div>
            <div className="col-6">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>At</th>
                            <th>Status</th>
                        </tr>
                        {logs.map((log) => renderLogRow(log))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Service;