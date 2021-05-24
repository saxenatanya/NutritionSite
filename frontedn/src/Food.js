import React, { Component } from 'react';

export default class Food extends Component {



    constructor(props) {
        super(props)

        this.state = {
            foods: [],
            searchedFoods: [],
            currentFood: {
                name: "-",
                calories: 0,
                protien: 0,
                carbs: 0,
                fats: 0,
                fibre: 0,
                weight: 0,
            }
        }
    }


    calculateChanges(weight) {
        
        let currFood = this.state.currentFood;

        if(weight !== "" & weight!==0)
        {currFood.calories = Number((currFood.calories * weight) / currFood.weight);
        currFood.protien = Number((currFood.protien * weight) / currFood.weight);
        currFood.carbs = Number((currFood.carbs * weight) / currFood.weight);
        currFood.fats = Number((currFood.fats * weight) / currFood.weight);
        currFood.weight=weight;
        this.setState({currentFood:currFood});
    }
else{
    console.log(currFood);
}
        


    }

    selectFood(food) {
        this.setState({ currentFood: food })
    }

    searchFood(value) {
        // applying loop on foods array
        if (value !== "") {
            let searchedFoodsArray = this.state.foods.filter((food, index) => {
                return food.name.toLowerCase().includes(value.toLowerCase());
            })

            this.setState({ searchedFoods: searchedFoodsArray });
            // console.log(value);
        }
        else {
            this.setState({ searchedFoods: [] });
            // console.log(value);
        }
    }

    // lifcycle method which is called when all the componets are loaded
    componentDidMount() {
        fetch("http://localhost:8000/foods")
            .then((response => response.json()))
            .then((foodsResponse) => {
                this.setState({ foods: foodsResponse.foods })
                console.log(foodsResponse.foods);
            })
            .catch((err => {
                console.log(err);
            }))

    }

    render() {
        return (
            <div className="container">
                <div className="form-group " style={{ marginTop: "30px" }}>
                    <input className="form-control" onChange={(e) => {
                        this.searchFood(e.target.value)
                    }} placeholder="Seacrh food"></input>
                </div>

                <div className="search-result" style={{ paddingTop: "30px" }}>

                    {
                        this.state.searchedFoods.map((food, index) => (
                            <div className="result" onClick={() => { this.selectFood(food) }} key={index} style={{ cursor: "pointer", padding: "10px" }}>
                                {food.name}
                            </div>
                        ))
                    }

                </div>

                <div className="product-display">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Calories</th>
                                <th>Protien</th>
                                <th>Carbs</th>
                                <th>Fibre</th>
                                <th>Fat</th>
                                <th>Weight</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFood.name}</td>
                                <td>{this.state.currentFood.calories.toFixed(2)}</td>
                                <td>{this.state.currentFood.protien.toFixed(2)}</td>
                                <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                                <td>{this.state.currentFood.fibre.toFixed(2)}</td>
                                <td>{this.state.currentFood.fats.toFixed(2)}</td>
                                <td>
                                    <input type="number" defaultValue={this.state.currentFood.weight} onChange={(e)=>{ this.calculateChanges(e.target.value)}}></input>
                                    </td>

                            </tr>
                        </tbody>
                    </table>


                </div>

            </div>
        )
    }
}

