import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car'

class App extends Component {
    state = {
        cars: [
            { name: 'Mazda 3', year: '2010' },
            { name: 'Mazda 6', year: '2019' }
        ],
        PageTittle: 'React component',
        showCars: false
    }


    toggleCarsHandler = (newTittle) => {
        
        this.setState({
            showCars: !this.state.showCars
        })
    }

    onChangeName(name, index) {
        const car = this.state.cars[index]
        car.name = name
        const cars = [...this.state.cars]
        cars[index] = car
        this.setState({
            cars
        })
    }

    deleteHandler(index) {
        const cars = this.state.cars.concat()
        cars.splice(index, 1)
        this.setState({cars})
    }

    render() {
        let cars = null

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <Car
                        key={index}
                        name={car.name}
                        year={car.year}
                        onDelete={this.deleteHandler.bind(this, index)}
                        onChangeName={event => this.onChangeName(event.target.value, index)}
                    />
                )
            })
        }
      return (
          <div className="App">
              <h1>{this.state.PageTittle}</h1>

              <button onClick={this.toggleCarsHandler}>Toogle cars</button>

              {cars}
          </div>


      );
    }
}

export default App;
