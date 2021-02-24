import axios from 'axios';
import '../App.css';
import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';


const AddProductForm = () => {
    const initProduct = {
        name: "",
        category: "",
        price: "",
        tags: [],
    };

    const [product, setProduct] = useState(initProduct);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = (event) => {
        let { name, value } = event.target;

        // if (name === "tags") {
        //     value = value.split(",");
        // }
        setProduct({ ...product, [name]: value })
    };

    const saveProduct = () => {
        var data = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags
        }
        axios
            .post("https://api61425048.herokuapp.com/product", data)
            .then((response) => {
                console.log(response.data);
                setSubmitted(true)
            })
            .catch((error) => {
                console.log(error);

            });

    };

    const newProduct = () => {
        setProduct(initProduct);
        setSubmitted(false);

    }
    return (

        <Container>
            <Row>
                <h3>Add new Products</h3>
            </Row>
            <Row>
                {submitted ? (
                    <>

                        <Alert className="a1" color="success">
                            P r o d u c t i s A d d d e d ! ! ! <br />
                        </Alert>


                        <Button className="b1" color="success" onClick={newProduct}>Add More Product</Button>

                    </>
                ) : (

                        <Form>
                            <FormGroup>
                                <Label for="productname">Product Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="productName"
                                    value={product.name || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุชื่อสินค้า" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="productCategory">Product Category</Label>
                                <Input
                                    type="text"
                                    name="category"
                                    id="productCategory"
                                    value={product.category || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุหมวดหมู่
                        " />
                            </FormGroup>

                            <FormGroup>
                                <Label for="productPrice">Product Price</Label>
                                <Input
                                    type="text"
                                    name="price"
                                    id="productPrice"
                                    value={product.price || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุราคา" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="productTags">Product Tags (หากมีมากกว่า 1 tag ให้คั่นด้วยเครื่องหมาย " , ")</Label>
                                <Input
                                    type="text"
                                    name="tags"
                                    id="productTags"
                                    value={product.tags || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุ tags ของสินค้า" />
                            </FormGroup>
                            <Button className="btn btn-success" onClick={saveProduct}> Add New Products</Button>
                        </Form>
                    )}
            </Row>
        </Container>
    );
};

export default AddProductForm;
