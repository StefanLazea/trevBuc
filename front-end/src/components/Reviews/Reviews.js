import React from "react";
import Axios from "axios";
import NavigationBar from '../Navbar/NavigationBar'
import "./Reviews.css";
import { toast } from "react-toastify";
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
            checked: false,
            buttonText: "Add Review",
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
    updateReview = async (id) => {
        var reviewToUpdate;
        var transportTypeToUpdate;

        await Axios.get(backUrl + '/reviews/' + id).then(res => reviewToUpdate = res.data);
        await Axios.get(backUrl + '/transport-type/' + reviewToUpdate.transportTypeId).then(res => transportTypeToUpdate = res.data);
        this.leavingPointRef.current.value = reviewToUpdate.leaving_point;
        this.arrivngPointRef.current.value = reviewToUpdate.arriving_point;
        this.transportNameRef.current.value = transportTypeToUpdate.name;
        this.transportTypeRef.current.value = transportTypeToUpdate.type;
        this.leftHourRef.current.value = reviewToUpdate.leaving_hour;
        this.durationRef.current.value = reviewToUpdate.duration;
        this.congestionLevelRef.current.value = reviewToUpdate.congestion_level;
        this.observationsRef.current.value = reviewToUpdate.observations;
        this.starClick(parseInt(reviewToUpdate.rating));
        var index = this.state.reviews.indexOf(reviewToUpdate);
        console.log("index" + index);
        this.setState({ buttonText: "Update review", updatedIndex: index, updatedReviewId: id });



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
        }
        )



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

        // Axios.put(backUrl + "/reviews/" + this.state.updatedReviewId, review,
        //     { headers: { "Authorization": getToken() } }).then(res => {
        //         var existingReviews = [...this.state.reviews];
        //         existingReviews[this.state.updatedIndex] = res.data;
        //         console.log(this.state.updatedIndex);
        //         this.setState({ reviews: existingReviews, buttonText: "Add Review" });
        //     })

    }


    componentDidMount() {
        try {
            this.setState({ userId: getUserId(), isUserLoggedIn: true });
        }
        catch (error) {
            this.setState({ isUserLoggedIn: false });

        }
    }



    handleInputChange = (event) => {
        let myReviews = [...this.state.reviews];
        myReviews = myReviews.filter(review => review.leaving_point === event.target.value)
        event.preventDefault()
        this.setState({
            searchFilter: event.target.value,
            filteredReviews: myReviews
        })

    }



    PressAddReview = () => {
        if (this.state.isUserLoggedIn) {
            this.setState({ addButtonState: !this.state.addButtonState, showButtonState: false,showAllReviewsButtonState:false, showMyReviewsButtonState : false })
        }

        else {
            toast("U need to login in order to add a review!");
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
        
                this.setState({ showMyReviewsButtonState: !this.state.showMyReviewsButtonState,addButtonState : false,
                showButtonState: false, showAllReviewsButtonState:false});
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
                this.setState({ showMyReviewsButtonState: false,addButtonState : false,
                    showButtonState: false});
            }


    render() {
        return <>

            <div className="App container">
                <NavigationBar />

        <button onClick = {this.PressAddReview}>Add Review</button>
        <button onClick = {this.PressFilterReview}>Filter Reviews</button>
        <button onClick={this.PressShowMyReviews}> Show my reviews</button>
        <button onClick={this.PressShowAllReviews}>Show All Reviews</button>
        {this.state.addButtonState === true ?
         <ReviewForm userId={this.state.userId} />
        : null }

                
                {this.state.showButtonState === true ?
                    <form>
                        <div className="lander">

                            <label>Search By Leaving Point</label>

                            <input type="text" placeholder="Leaving Point" name="searchFilter" onInput={this.handleInputChange}></input>

                            {(this.state.searchFilter.length > 0 && this.state.filteredReviews.length > 0) ?
                                <AllReviews reviews={this.state.filteredReviews} />
                                : null}

                             
                           

                        </div>
                    </form> : null
                }

                              {                        
                               this.state.showMyReviewsButtonState ===true ? <FilteredReviews allowEditing={true} userId={this.state.userId} />
                               : null}

                         {
                             this.state.showAllReviewsButtonState === true ? <AllReviews reviews={this.state.filteredReviews} />
                             : null
                         }
    </div>
        

        </>
    }
}