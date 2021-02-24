import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Container, Row, Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import confirm from "reactstrap-confirm";
//import icon จาก fontawesome


export const ProductList = () => {
    const [Product, setProducts] = useState([]);
    // ใช้ useState เก็บ สร้าง product 
    const updateProducts = () => {
        axios.get("https://api61425048.herokuapp.com/product").then((response) => {
            //   รับตัวแปลมาจาก งานเก่า แล้วก็มาเก็บไว้ใน setProducts 
            setProducts(response.data.product);
            console.log("Update");
        });
    };
    useEffect(() => {
        updateProducts();
        // ใช้updateProductsบรรทัด 7
    }, []);

    const delectProduct = async (productId, productName) => {
        //delect by Product
        let result = await confirm({
            title: <>Confirmation !!</>,
            message: "Do you want to delect this ID?" + productName + "?",
            confirmText: "YES",
            confirmColor: "primary",
            cancelText: "No",
            cancelColor: "btn btn danger",
        });
        if (result) {
            //ถ้า result เป็น true ส่งค่าไป mongo
            axios.delete("https://api61425048.herokuapp.com/product/" + productId)
                .then((response) => {
                    //แล้วก็อัพเดท product
                    updateProducts();
                });
        }
    };

    return (
        <Container>
            <Row><h3>Product List</h3></Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* วนลูป  */}
                        {Product.map((Product) => {
                            //   ต้องใช้ key กับ id
                            return (<tr key={Product.id}>
                                <td>
                                    {Product.name}
                                </td>
                                <td>{Product.category}</td>
                                <td>{Product.price}</td>
                                <td><Button color="info" href={"/edit/" + Product._id}>
                                    <FontAwesomeIcon icon={faEdit} />Edit</Button> {" "}
                                    {/* <FontAwesomeIcon icon={faEdit}/> ใช้เพื่ม icon ในปุ่ม*/}
                                    <Button color="danger" onClick={() => delectProduct(Product._id, Product.name)}> <FontAwesomeIcon icon={faTrash} />Delect</Button></td>
                                {/* ใช้ button reactstrap มาไม่ต้องใช้ a href  และ edit by _id ต้องมี _ ด้วยเพราะส่งค่า */}
                            </tr>);
                        })}

                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}
export default ProductList;