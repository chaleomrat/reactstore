import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Alert, Container, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';

const EditProjectForm = ({ id }) => {//id ที่ส่งผ่าน props
    const initProduct = {
        _id: "",
        name: "",
        category: "",
        price: "",
        tage: [],
    };// สร้างตัวแปร

    const [product, setProduct] = useState(initProduct); //ตั้ง product ให้เท่ากับ initProduct โดย useState  

    const [Submitted, setSubmitted] = useState(false);

    useEffect(() => {
        axios.get("https://api61425048.herokuapp.com/products/" + id)
            .then((response) => {
                setProduct(response.data);
            });
    }, [id]);//เมื่อมีการเปลี่ยนแปลวงจะ ใช้ useEffect ทันที
    //get byid แล้วเอามาเก็บ response.data แล้วนำไปแทนค่าใน form


    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {
            value = value.split(",");
            //split แบ่ง array ตาม ,
        }
        setProduct({ ...product, [name]: value });
        //... ใช้เก็บค่าเดิมไว้แก้แค่ค้าใหม่
    };

    const saveProduct = () => {
        var data = {
            name: product.name,
            category: product.category,
            price: product.price,
            tage: product.tage
        };//เอาค่าที่รับจาก form มาใส่ใน array

        axios.put("https://api61425048.herokuapp.com/product/" + product._id, data)//ส่งid และ dataค่าไปแอดใน DB 
            .then((response) => {
                console.log(response.data);
                setProduct({ ...product, data });//set product ให้เป็นค่าที่เราแก้ใหม่
                setSubmitted(true);
            })

            .catch((error) => {
                console.log(error);
            });//ใช้ ดัก Error
    };
    const newProduct = () => {
        setSubmitted(false);
    };
    return (
        <>
            <Container>
                <Row>Edit Product</Row>
                <Row>
                    {Submitted ? (
                        <>
                            <Alert color="success">
                                Product is updated !!
                            <Button color="btn btn-success" onCliclk={newProduct}>ok</Button>
                            </Alert>
                        </>
                    ) : (
                            <Form>

                                <FormGroup>
                                    <Label for="productName">Name</Label>
                                    <Input type="text" name="name" id="productName" value={product.name || ""} onChange={handleInputChange} placeholder="ระบุชื่อ" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="productName">Category</Label>
                                    <Input type="text" name="category" id="productName" value={product.category || ""} onChange={handleInputChange} placeholder="ระบุหมวดหมู่" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="productName">Price</Label>
                                    <Input type="text" name="price" id="productName" value={product.price || ""} onChange={handleInputChange} placeholder="ระบุราคา" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="productName">Tags</Label>
                                    <Input type="text" name="tage" id="productName" value={product.tage || ""} onChange={handleInputChange} placeholder="ระบุ tags" />
                                </FormGroup>
                                <Button onClick={saveProduct} className="btn btn-danger">Update</Button>
                            </Form>
                        )}

                </Row>
            </Container>
        </>
    )
}

export default EditProjectForm
