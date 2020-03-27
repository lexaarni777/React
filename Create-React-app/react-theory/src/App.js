import React, { Component } from 'react';
import './App.scss';
import Car from './Car/Car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Counter from './Counter/Counter'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            clicked: false,
            cars: [
                { name: 'Mazda 3', year: '2010' },
                { name: 'Mazda 6', year: '2019' }
            ],
            PageTittle: 'React component',
            showCars: false
        }
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
                    <ErrorBoundary>    
                    key={index}
                        <Car
                            name={car.name}
                            year={car.year}
                            onDelete={this.deleteHandler.bind(this, index)}
                            onChangeName={event => this.onChangeName(event.target.value, index)}
                        />
                    </ErrorBoundary>
                )
            })
        }
        return (
            <div className='App' >
              <h1>{this.state.PageTittle}</h1>
              <h1>{this.props.title}</h1>

              <Counter clicked={this.state.clicked}/>
              {console.log(this.state)}
            
                <button
                    className={'AppButton'}
                    onClick={this.toggleCarsHandler}
                >Toogle cars</button>

                <button
                    onClick={()=>this.setState({clicked: true})}
                >Chanhe clickd</button>

              <div style={{
                  width: 400,
                  margin: 'auto',
                  paddingTop: '20px'
              }}>
                  {cars}
              </div>
          </div>


      );
    }
}

export default App;
