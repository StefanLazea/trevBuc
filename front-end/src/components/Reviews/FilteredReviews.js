import React from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import { getToken } from '../../services/Token';
import { toast } from 'react-toastify';
const backUrl = require("../../../src/configuration.json").backend_url;
 


export default class FilteredReviews extends React.Component {

constructor(props){
    super(props);
    this.state = {
        reviews: [],
        editButtonText: "Edit"
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

   editContent =  async (id) =>{
       var tds = document.querySelectorAll('td');
       
       if(this.state.editButtonText === "Edit"){
        tds.forEach(tabelCell => tabelCell.contentEditable = true);
        this.setState({editButtonText: "Save"});
       }

       else {
        tds.forEach(tabelCell => tabelCell.contentEditable = false);
        var tabelRaw = document.getElementById(id);
        let reviewId;
        let userId;
        let transportTypeId;
        
        await Axios.get(backUrl+ '/reviews/'+ id).then(res => {
            reviewId = res.data.id;
            userId = res.data.userId;
            transportTypeId = res.data.userId;
        })
        var review = {
            id: reviewId,
            leaving_point: tabelRaw.childNodes[1].innerText,
             arriving_point: tabelRaw.childNodes[2].innerText,
            leaving_hour: tabelRaw.childNodes[3].innerText,
            duration: parseInt(tabelRaw.childNodes[4].innerText),
            observations: tabelRaw.childNodes[5].innerText,
            rating: tabelRaw.childNodes[6].innerText,
            congestion_level: parseInt(tabelRaw.childNodes[7].innerText),
            userId: userId, 
            transportTypeId: transportTypeId,

        }
        Axios.put(backUrl+ '/reviews/' + id,review,{ headers: { "Authorization": getToken() } }).then(toast("The review was updated succesfully"));

       }

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

                        <tr id={review.id} key={review.id}>
                            <td>{review.transportTypeId}</td>
                            <td>{review.leaving_point}</td>
                            <td>{review.arriving_point}</td>
                            <td>{review.leaving_hour}</td>
                            <td>{review.duration}</td>
                            <td>{review.congestion_level}</td>
                            <td>{review.observations}</td>
                            <td>{review.rating}</td>
                            <td><button onClick={() => {this.editContent(review.id)}}>{this.state.editButtonText}</button>
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