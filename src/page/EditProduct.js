import React from 'react';
import EditProductForm from "../components/EditProductForm";

const EditProduct = (props) => {
  return (
    <>
      <main>
        <EditProductForm id={props.match.params.id} />
        {/* ส่ง id ผ่าน Props ไปยัง components Editproduct */}
      </main></>
  );
};

export default EditProduct;
