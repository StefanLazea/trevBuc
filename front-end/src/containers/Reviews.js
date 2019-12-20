import React from "react";
import Axios from "axios";
import "./Reviews.css";

export default class Reviews extends React.Component {
    state = {
        reviews: []
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
        return (
            <div className="Reviews" >
                <div className="lander">
                    <h1>Welcome to reviews</h1>
                    <ul>
                        {this.state.reviews.map(review => <li key={review.id}>{review.leaving_point}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}