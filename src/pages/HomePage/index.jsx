import React, { useEffect, useMemo } from "react";
import { Button, Form, Card, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "./components/ProductItem";

import {
  getProductListAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
  getCategoryListAction,
} from "../../redux/actions";

const initialValues = {
  productName: "",
  price: 0,
  categoryId: undefined,
};

function HomePage() {
  const dispatch = useDispatch();
  const { productList, createProductData } = useSelector(
    (state) => state.product
  );
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getCategoryListAction());
  }, []);

  function handleCreateProduct(values) {
    dispatch(createProductAction({ data: values }));
  }

  function handleUpdateProduct(id, values) {
    dispatch(updateProductAction({ id: id, data: values }));
  }

  function handleDeleteProduct(id) {
    dispatch(deleteProductAction({ id: id }));
  }

  const renderProductList = useMemo(() => {
    if (productList.loading) return <div>Loading...</div>;
    return productList.data.map((item, index) => {
      return (
        <ProductItem
          key={index}
          productData={item}
          handleUpdateProduct={handleUpdateProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      );
    });
  }, [productList]);

  const renderCategoryOptions = useMemo(() => {
    return categoryList.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList]);

  return (
    <>
      <h1>Task C</h1>
      <Card size="small" title="Tạo sản phẩm mới">
        <Form
          name="Create Product"
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleCreateProduct(values)}
        >
          <Form.Item
            label="Tên sản phẩm AA"
            name="name"
            validateFirst
            rules={[
              {
                required: true,
                message: "Name là bắt buộc!",
              },
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: "Giá là bắt buộc!",
              },
              {
                type: "number",
                min: 500000,
                message: "Giá phải lớn hơn 500.000!",
              },
            ]}
          >
            <InputNumber placeholder="Giá sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Hãng sản xuất"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Hãng là bắt buộc!",
              },
            ]}
          >
            <Select placeholder="Hãng sản xuất">{renderCategoryOptions}</Select>
          </Form.Item>
          <Button htmlType="submit" loading={createProductData.loading}>
            Tạo sản phẩm
          </Button>
        </Form>
      </Card>
      {renderProductList}
    </>
  );
}

export default HomePage;
