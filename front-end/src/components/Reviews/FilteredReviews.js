import React from 'react';
import { Table } from 'react-bootstrap';

export default function FilteredReviews(props) {
    return <>
        <Table striped bordered hover>
            <tbody>
                <tr >
                    <th>Name</th>
                    <th>Leaving Point</th>
                    <th>Arriving Point</th>
                    <th>Leaving Hour</th>
                    <th>Travel Duration</th>
                    <th>Congestion Level</th>
                    <th>Observations</th>
                    <th>Rating</th>
                </tr>
                {
                    props.reviews.map(review =>

                        <tr key={review.id}>
                            <td>{review.transportTypeId}</td>
                            <td>{review.leaving_point}</td>
                            <td>{review.arriving_point}</td>
                            <td>{review.leaving_hour}</td>
                            <td>{review.duration}</td>
                            <td>{review.congestion_level}</td>
                            <td>{review.observations}</td>
                            <td>{review.rating}</td>
                        </tr>)
                }


            </tbody>
        </Table>
    </>
}