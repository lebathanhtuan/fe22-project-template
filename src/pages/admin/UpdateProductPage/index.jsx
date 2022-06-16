import React, { useEffect, useMemo } from "react";
import { Row, Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";
import {
  updateProductAction,
  getProductDetailAction,
  getCategoryListAction,
  clearProductDetailAction,
} from "../../../redux/actions";

function UpdateProductPage() {
  const [updateForm] = Form.useForm();

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { productDetail, updateProductData } = useSelector(
    (state) => state.product
  );
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(getCategoryListAction());

    return () => {
      dispatch(clearProductDetailAction());
    };
  }, []);

  useEffect(() => {
    if (productDetail.data.id) {
      updateForm.resetFields();
    }
  }, [productDetail.data]);

  function handleCreateProduct(values) {
    dispatch(
      updateProductAction({
        id: id,
        data: values,
        callback: {
          goToList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
        },
      })
    );
  }

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList]);

  return (
    <>
      <Row justify="space-between">
        <h3>Cập nhật sản phẩm</h3>
        <Button
          type="primary"
          onClick={() => updateForm.submit()}
          loading={updateProductData.loading}
        >
          Cập nhật
        </Button>
      </Row>
      <Form
        form={updateForm}
        name="Create Product"
        layout="vertical"
        initialValues={{
          name: productDetail.data.name,
          price: productDetail.data.price,
          categoryId: productDetail.data.categoryId,
        }}
        onFinish={(values) => handleCreateProduct(values)}
      >
        <Form.Item
          label="Tên sản phẩm"
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
      </Form>
    </>
  );
}

export default UpdateProductPage;
