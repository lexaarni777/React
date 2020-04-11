import React, {Component} from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../componets/Navigation/MenuToogle/MenuToggle'
import Drawer from '../../componets/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'

 class Layout extends Component{
    state = {
        menu: false
    }

    toggleMenuHendler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHendler = () => {
        this.setState({
            menu: false
        })
    }

     render(){
         return(
             <div className={classes.Layout}>

             <Drawer
             isOpen={this.state.menu}
             onClose={this.menuCloseHendler}
             isAuthenticated={this.props.isAuthenticated}
             />

                 <MenuToggle
                    onToggle={this.toggleMenuHendler}
                    isOpen={this.state.menu}
                 />
                 <main>
                     {this.props.children}
                 </main>
             </div>
         )
     }
 }

 function mapStateToProps(state){
     return{
        isAuthenticated: !!state.auth.token
     }
 }

 export default connect(mapStateToProps)(Layout)