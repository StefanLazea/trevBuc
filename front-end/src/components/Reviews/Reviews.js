import React from "react";
import Axios from "axios";
import "./Reviews.css";
import 'bootstrap/dist/css/bootstrap.css';

export default class Reviews extends React.Component {
    state = {
        reviews: [], 
        transportTypes: []
    }

     selectRef = React.createRef();

 handleSelect = () => {
     var transportType= {
             name : this.selectRef.current.value,
             type : this.selectRef.current.value

     } 
     Axios.post(`http://localhost:3000/transport-type`,transportType)
            .then(res => {
            
            })


 }

    componentDidMount() {
        Axios.get(`http://localhost:3000/reviews`)
            .then(res => {
                const reviews = res.data;
                console.log(reviews)
                this.setState({ reviews });
            })
    }
    render() {
        return <>
            <label>Select the transport type</label>
            <select className="form-control" ref={this.selectRef} onChange={this.handleSelect}>
            <option value="Taxi">Taxi</option>
            <option value="Metrou">Metrou</option>
            <option value="STB">STB</option>
          </select>
                <div className="lander">
                    <h1>Welcome to reviews</h1>
                    <ul>
                        {this.state.reviews.map(review => <li key={review.id}>{review.leaving_point}</li>)}
                    </ul>
                </div>
            
        </>
    }
}