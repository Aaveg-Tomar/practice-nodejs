import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AppliedJobs = () => {

    const [applied, setApplied] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const handleAppliedJobs = async () => {
            const response = await axios.get('http://localhost:8000/api/appliedjobs', {
                withCredentials: true,
            });

            if (response.data.status === 'ok') {
                setApplied(response.data.appliedJobs);
                console.log(applied);
            } else {
                setErr("not getting details");
                console.log(err);
            }

        }

        handleAppliedJobs();
    }, []);

    useEffect(() => {
        if (applied) {
            console.log("Job Details:", applied);
        }
    }, [applied]);


    return (
        <>
            <div>
                <div> Applied for these  jobs </div>
            </div>
        </>
    )
}

export default AppliedJobs