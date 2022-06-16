import React, { useEffect, useMemo } from "react";
import { Row, Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";
import {
  createProductAction,
  getCategoryListAction,
} from "../../../redux/actions";

const initialValues = {
  productName: "",
  price: 0,
  categoryId: undefined,
};

function CreateProductPage() {
  const [createForm] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { createProductData } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  function handleCreateProduct(values) {
    dispatch(
      createProductAction({
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
        <h3>Tạo mới sản phẩm</h3>
        <Button
          type="primary"
          onClick={() => createForm.submit()}
          loading={createProductData.loading}
        >
          Tạo
        </Button>
      </Row>
      <Form
        form={createForm}
        name="Create Product"
        layout="vertical"
        initialValues={initialValues}
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

export default CreateProductPage;
