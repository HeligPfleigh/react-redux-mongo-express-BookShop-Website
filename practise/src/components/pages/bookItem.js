import React from 'react';
import {Row, Col, Well, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions';

class BookItem extends React.Component{
    constructor(){
        super();
        this.state = {
            isClicked: false
        };
    }

    onReadMore(){
        this.setState({isClicked:true});
    }

    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={8}>
                        <Image src={this.props.images}/>
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>
                            {(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0,50)):(this.props.description)}
                            <button className='link' onClick={this.onReadMore.bind(this)}>
                                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?("...Read more"):("")}
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button bsStyle="primary" onClick={this.handleCart.bind(this)}>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        );
    }

    handleCart(){
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            quantity: 1
        }];

        //CHECK IF CART IS EMPTY
        if(this.props.cart.length > 0){
            //CART IS NOT EMPTY
            let _id = this.props._id;
            let cardIndex = this.props.cart.findIndex(function(cart){
                return cart._id === _id;
            })

            //IF THERE ARE NO ITEM WITH SAME ID
            if(cardIndex === -1){
                this.props.addToCart(book);
            }
            else{
                //UPDATE THE QUANTITY
                this.props.updateCart(_id, 1, this.props.cart);
            }
        }
        else{
            //CART IS EMPTY
            this.props.addToCart(book);
        }
        
    }
}

function mapStateToProps(state){
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart:addToCart,
        updateCart:updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);