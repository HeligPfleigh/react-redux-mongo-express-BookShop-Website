"use strict"
import React from 'react';
import {
    Well, Panel, FormControl, FormGroup, ControlLabel, Button,
    InputGroup, DropdownButton, Image, Col, Row, MenuItem, 
    FormControlFeedback
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks, deleteBook, getBooks, resetButton, uploadImage, downloadImage } 
from '../../actions/index';
import axios from 'axios';

class BookForm extends React.Component {
    constructor(){
        super();
        this.state = {
            images: [{}],
            img: '',
            file: null
        }
    }

    componentDidMount(){
        this.props.getBooks();

        axios.get('/api/images')
        .then((res) => {
            this.setState({images:res.data});
        })
        .catch(err => {
            this.setState({images: 'error loading image files from the server', img:''})
        })
    }

    handleSubmit() {

        const book =
            {
                images: findDOMNode(this.refs.images).value,
                title: findDOMNode(this.refs.title).value,
                description: findDOMNode(this.refs.description).value,
                price: findDOMNode(this.refs.price).value,
            }
            ;
        this.props.postBooks(book);
    }

    handleSelect(img){
        this.setState({
            img: '/images/'+img
        });
    }

    resetForm(){
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({img:''});
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBook(bookId);
    }

    onDownloadImage(e){
        e.preventDefault();
        this.props.downloadImage();
    }

    onChangeImageChoosen(e){
        this.setState({file:e.target.files[0]});
    }

    onUploadImage(e){
        //e.preventDefault();
        if(this.state.file || this.state.file.type === "image/jpeg" || this.state.file.type === "image/png")
        {
            const formData = new FormData();
            formData.append('file', this.state.file);
            this.props.uploadImage(formData);
        }
        else{
            alert('Sorry, we haven\'t support this type of file.' );
        }
    }

    render() {
        const booksList = this.props.books.map(function (bookArr) {
            return (
                <option key={bookArr._id}>{bookArr._id}</option>
            )
        });

        const imgList = this.state.images.map(function(imgArr, i){
            return (
                <MenuItem key={i} eventKey={imgArr.name}
                    onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
            )
        }, this);

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <InputGroup>
                            <FormControl type="text" ref="images" value={this.state.img}/>
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Select an image"
                                bsStyle="primary">
                                {imgList}
                            </DropdownButton>
                        </InputGroup>
                        <Image src={this.state.img} responsive />
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>
                            <Button 
                                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
                                bsStyle={(this.props.style)?(this.props.style):("primary")}
                                >
                                {(this.props.msg)?(this.props.msg):('Save book!')}
                            </Button>
                        </Panel>
                        <Panel style={{ marginTop: '25px' }}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a book id to delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    {/* <option value="1">select</option> */}
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <form>
                                <FormGroup>
                                    <ControlLabel>File</ControlLabel>
                                    <FormControl
                                        type="file"
                                        ref="imagefile" 
                                        onChange={this.onChangeImageChoosen.bind(this)}
                                    />
                                </FormGroup>
                                <Button bsStyle='primary' type="submit" onClick={this.onUploadImage.bind(this)}>Upload Image</Button>
                            </form>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Button bsStyle="primary" onClick={this.onDownloadImage.bind(this)}>Download Test Image</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks: postBooks,
        deleteBook: deleteBook,
        getBooks: getBooks,
        resetButton: resetButton,
        uploadImage: uploadImage,
        downloadImage: downloadImage
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
