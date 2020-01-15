import React from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
const backUrl = require("../../../src/configuration.json").backend_url;
 


export default class FilteredReviews extends React.Component {

constructor(props){
    super(props);
    this.state = {
        reviews: []
    }
}

componentDidMount = () =>{
    Axios.get(backUrl+ '/reviews/user/' +this.props.userId).then(
        res => {
            this.setState({reviews: res.data});
        }
    )
}

    deleteReview (id) {
        Axios.delete(backUrl+'/reviews/'+id).then(toast('the review was succesfully'));
        var reviewsCopy = [...this.state.reviews];
        var review = reviewsCopy.find(review => review.id === id);
        var index = reviewsCopy.indexOf(review);
        
         reviewsCopy.splice(index,1);
         this.setState({reviews: reviewsCopy});

   }

   editContent = () =>{
       
   }
    render() {

    
    return <>
        <Table striped bordered hover responsive>
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
                {      this.props.allowEditing === true ?
                    this.state.reviews.map(review =>

                        <tr key={review.id}>
                            <td>{review.transportTypeId}</td>
                            <td>{review.leaving_point}</td>
                            <td>{review.arriving_point}</td>
                            <td>{review.leaving_hour}</td>
                            <td>{review.duration}</td>
                            <td>{review.congestion_level}</td>
                            <td>{review.observations}</td>
                            <td>{review.rating}</td>
                            <td><button onClick={this.editContent}>Edit</button>
                                <button onClick={() => {this.deleteReview(review.id)}}>Delete</button>
                            </td>
                        </tr>) :
                        this.state.reviews.map(review =>

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
}