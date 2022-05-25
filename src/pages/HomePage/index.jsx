import React, { useEffect, useMemo } from "react";
import {
  Button,
  Form,
  Card,
  Input,
  Checkbox,
  InputNumber,
  Select,
  Radio,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "./components/ProductItem";

import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../redux/actions/product.action";

import { ROUTES } from "../../constants/routes";

const initialValues = {
  productName: "",
  description: "",
  price: 0,
  brand: "",
  option: [],
  color: "",
  isNew: false,
};

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    console.log("Mới vào Home Page");
    // Gọi API để lấy dữ liệu
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
    return productList.map((item, index) => {
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

  return (
    <>
      <div>
        <a href={ROUTES.ADMIN.PRODUCT_LIST}>
          Đi đến danh sách sản phẩm (thẻ a)
        </a>
      </div>
      <div>
        <Link to={ROUTES.ADMIN.PRODUCT_LIST}>
          Đi đến danh sách sản phẩm (Link)
        </Link>
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            window.location.href =
              ROUTES.ADMIN.PRODUCT_LIST;
          }}
        >
          Chuyển trang bằng window.location.href
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            navigate(ROUTES.ADMIN.PRODUCT_LIST);
          }}
        >
          Chuyển trang bằng navigate
        </Button>
      </div>
      <Card size="small" title="Create Product">
        <Form
          name="Create Product"
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleCreateProduct(values)}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            validateFirst
            rules={[
              {
                required: true,
                message: "Name là bắt buộc!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Description là bắt buộc!",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Select>
              <Select.Option value="apple">
                Apple
              </Select.Option>
              <Select.Option value="samsung">
                Samsung
              </Select.Option>
              <Select.Option value="xiaomi">
                Xiaomi
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Option" name="option">
            <Checkbox.Group
              options={[
                {
                  label: "Option 1",
                  value: "1",
                },
                {
                  label: "Option 2",
                  value: "2",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Radio.Group>
              <Radio value="black">Black</Radio>
              <Radio value="white">White</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isNew" valuePropName="checked">
            <Checkbox>Is New</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
      {renderProductList}
    </>
  );
}

export default HomePage;
