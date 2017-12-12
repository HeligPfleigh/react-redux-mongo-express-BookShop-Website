"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {
    Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { deleteCartItem, updateCart, getCart } from '../../actions/cartActions';

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        }
    }

    componentDidMount(){
        this.props.getCart();
    }

    open(){
        this.setState({showModal:true})
    }

    close(){
        this.setState({showModal:false})
    }

    onDelete(_id){
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex((cart) => cart._id == _id);
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
        ...currentBookToDelete.slice(indexToDelete + 1)];

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1, this.props.cart);
    }

    onDecrement(_id, quantity){
        if (quantity > 1)
            this.props.updateCart(_id, -1, this.props.cart);
    }

    render(){
        if(this.props.cart[0]){
            return this.renderCart()
        }
        return this.renderEmpty();
    }

    renderEmpty(){
        return(<div></div>)
    }

    renderCart(){
        const cartItemList = this.props.cart.map((cartItem, _id)=>{
            return (
                <Panel key={_id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartItem.title}<span>    </span></h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartItem.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartItem.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartItem._id, cartItem.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartItem._id)} bsStyle="default" bsSize="small">+</Button>
                                <span>    </span>
                                <Button onClick={this.onDelete.bind(this, cartItem._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                            </ButtonGroup>
                        </Col>                       
                    </Row>
                </Panel>
            );
        }, this);
        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItemList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount: {this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} bsSize="small" bsStyle="success">
                            PROCEES TO CHECKOUT
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col xs={6}>Total $: {this.props.totalAmount}</Col>
                        </Row>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart,
        getCart: getCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);