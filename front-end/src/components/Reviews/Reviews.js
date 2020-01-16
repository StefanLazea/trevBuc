import React from "react";
import Axios from "axios";
import NavigationBar from '../Navbar/NavigationBar'
import "./Reviews.css";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { getUserId, getToken } from '../../services/Token';
import FilteredReviews from './FilteredReviews';
import ReviewForm from './ReviewForm/ReviewForm';
import AllReviews from "./AllReviews";
const backUrl = require("../../../src/configuration.json").backend_url;


export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            myReviews: [],
            userId: -1,
            placeholderText: "Example: 300",
            starNumber: 1,
            addButtonState: false,
            showButtonState: false,
            showMyReviewsButtonState: false,
            showAllReviewsButtonState: false,
            isUserLoggedIn: true,
            searchFilter: "",
            filteredReviews: [],
            updatedIndex: -1,
            updatedReviewId: -1
        }


    }




    starClick = (i) => {

        for (let j = 0; j < i; j++) {
            document.getElementById("star" + j).className = "fa fa-star checked";
        }

        for (let j = i; j < 5; j++) {
            document.getElementById("star" + j).className = "fa fa-star";
        }

        this.setState({ starNumber: i });

    }



    handleSubmit = async (event) => {
        event.preventDefault();

        var transportType = {
            name: this.transportNameRef.current.value,
            type: this.transportTypeRef.current.value
        }
        var transportTypeDb;
        await Axios.post(backUrl + "/transport-type", transportType).then(res => {
            transportTypeDb = res.data;
        })



        var review = {
            leaving_point: String(this.leavingPointRef.current.value),
            arriving_point: String(this.arrivngPointRef.current.value),
            leaving_hour: String(this.leftHourRef.current.value),
            duration: parseInt(this.durationRef.current.value),
            observations: String(this.observationsRef.current.value),
            rating: String(this.state.starNumber),
            congestion_level: parseInt(this.congestionLevelRef.current.value),
            userId: parseInt(this.state.userId),
            transportTypeId: parseInt(transportTypeDb.id),

        }

        Axios.post(backUrl + "/reviews", review,
            { headers: { "Authorization": getToken() } }).then(res => {
                var existingReviews = [...this.state.reviews];
                existingReviews.push(res.data);
                console.log(res.data);
                this.setState({ reviews: existingReviews });
            })

    }


    componentDidMount() {
        try {
            this.setState({ userId: getUserId(), isUserLoggedIn: true });
        }
        catch (error) {
            this.setState({ isUserLoggedIn: false });
        }
    }



    handleInputChangeLeaving = (event) => {
        let myReviews = [...this.state.reviews];
        myReviews = myReviews.filter(review => review.leaving_point === event.target.value.toUpperCase())
        event.preventDefault()
        this.setState({
            searchFilter: event.target.value,
            filteredReviews: myReviews
        })
    }

    handleInputChangeArriving = (event) => {
        let myReviews = [...this.state.reviews];
        myReviews = myReviews.filter(review => review.arriving_point === event.target.value.toUpperCase())
        event.preventDefault()
        this.setState({
            searchFilter: event.target.value,
            filteredReviews: myReviews
        })
    }


    PressAddReview = () => {
        if (this.state.isUserLoggedIn) {
            this.setState({ addButtonState: !this.state.addButtonState, showButtonState: false, showAllReviewsButtonState: false, showMyReviewsButtonState: false })
        }

        else {
            toast("You need to login in order to add a review!");
        }

    }

    PressFilterReview = () => {
        Axios.get(backUrl + "/reviews")
            .then(res => this.setState({
                reviews: res.data,
                showButtonState: !this.state.showButtonState,
                showMyReviewsButtonState: false,
                addButtonState: false,
                showAllReviewsButtonState: false,
                filteredReviews: []
            }));
    }

    PressShowMyReviews = () => {

        this.setState({
            showMyReviewsButtonState: !this.state.showMyReviewsButtonState, addButtonState: false,
            showButtonState: false, showAllReviewsButtonState: false
        });
    }

    PressShowAllReviews = () => {
        Axios.get(backUrl + "/reviews")
            .then(res => this.setState({
                filteredReviews: res.data,
                showButtonState: false,
                showMyReviewsButtonState: false,
                addButtonState: false,
                showAllReviewsButtonState: !this.state.showAllReviewsButtonState

            }));
        this.setState({
            showMyReviewsButtonState: false, addButtonState: false,
            showButtonState: false
        });
    }


    render() {
        return <>

            <div className="App container">
                <NavigationBar />
                <div className="spacing">
                    <Button onClick={this.PressAddReview}>Add Review</Button>
                    <Button onClick={this.PressShowMyReviews}>Show my reviews</Button>
                    <Button onClick={this.PressFilterReview}>Filter Reviews</Button>
                    <Button onClick={this.PressShowAllReviews}>Show All Reviews</Button>
                </div>
                {this.state.addButtonState === true ?
                    <ReviewForm userId={this.state.userId} />
                    : null}


                {this.state.showButtonState === true ?
                    <form>
                        <div className="lander">

                            <h3><span className="label label-default">Search By Leaving Point</span></h3>

                            <h3><span className="label label-default">Search By Arriving Point</span></h3>
                        </div>

                        <div className="fields">
                            <input type="text" placeholder="Leaving Point" name="searchFilter" onInput={this.handleInputChangeLeaving}></input>

                            <input type="text" placeholder="Arriving Point" name="searchFilter" onInput={this.handleInputChangeArriving}></input>
                        </div>

                        {(this.state.searchFilter.length > 0 && this.state.filteredReviews.length > 0) ?
                            <AllReviews reviews={this.state.filteredReviews} />
                            : null}

                    </form> : null
                }

                {
                    this.state.showMyReviewsButtonState === true ? <FilteredReviews allowEditing={true} userId={this.state.userId} />
                        : null
                }

                {
                    this.state.showAllReviewsButtonState === true ? <AllReviews reviews={this.state.filteredReviews} />
                        : null
                }
            </div>
        </>
    }
}