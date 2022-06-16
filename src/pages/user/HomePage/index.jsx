import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Slider, Input, Select, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";
import { PAGE_SIZE } from "../../../constants/pagination";
import { ROUTES } from "../../../constants/routes";

function HomePage() {
  const [filterParams, setFilterParams] = useState({
    keyword: "",
    categoryIds: [],
    price: [0, 50000000],
    sortOrder: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PAGE_SIZE.MINI,
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  function handleSearchKeyword(value) {
    setFilterParams({
      ...filterParams,
      keyword: value,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PAGE_SIZE.MINI,
        keyword: value,
      })
    );
  }

  function handleFilterCategory(values) {
    setFilterParams({
      ...filterParams,
      categoryIds: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PAGE_SIZE.MINI,
        categoryIds: values,
      })
    );
  }

  function handleFilterPrice(values) {
    setFilterParams({
      ...filterParams,
      price: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PAGE_SIZE.MINI,
        price: values,
      })
    );
  }

  function handleSortPrice(value) {
    setFilterParams({
      ...filterParams,
      sortOrder: value,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PAGE_SIZE.MINI,
        sortOrder: value,
      })
    );
  }

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PAGE_SIZE.MINI,
        more: true,
      })
    );
  };

  const renderCategoryFilter = () => {
    return categoryList.data.map((categoryItem) => {
      return (
        <Col span={24} key={categoryItem.id}>
          <Checkbox value={categoryItem.id}>{categoryItem.name}</Checkbox>
        </Col>
      );
    });
  };

  const renderProductList = () => {
    return productList.data.map((productItem) => {
      return (
        <Col lg={6} md={6} sm={12} xs={24} key={productItem.id}>
          <Card
            title={productItem.name}
            size="small"
            onClick={() =>
              navigate(
                generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                  id: productItem.id,
                })
              )
            }
            style={{ cursor: "pointer" }}
          >
            {productItem.price.toLocaleString()} VND
          </Card>
        </Col>
      );
    });
  };

  return (
    <div style={{ width: "100%", padding: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 6, order: 1 }}>
          <Card title="Hãng sản xuất" size="small">
            <Checkbox.Group
              value={filterParams.categoryIds}
              onChange={(values) => handleFilterCategory(values)}
            >
              <Row>{renderCategoryFilter()}</Row>
            </Checkbox.Group>
          </Card>
          <Card title="Giá" size="small" style={{ marginTop: 16 }}>
            <Slider
              range
              min={0}
              max={50000000}
              step={100000}
              tipFormatter={(value) => `${value.toLocaleString()} VND`}
              defaultValue={filterParams.price}
              onAfterChange={(values) => handleFilterPrice(values)}
            />
          </Card>
        </Col>
        <Col xs={{ span: 18, order: 2 }}>
          <div style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Input.Search
                  onSearch={(value) => handleSearchKeyword(value)}
                  allowClear
                  placeholder="Tìm kiếm"
                />
              </Col>
              <Col span={8}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Sắp xếp"
                  value={filterParams.sortOrder}
                  allowClear
                  onChange={(value) => handleSortPrice(value)}
                >
                  <Select.Option value="asc">Giá tăng dần</Select.Option>
                  <Select.Option value="desc">Giá giảm dần</Select.Option>
                </Select>
              </Col>
            </Row>
          </div>
          <Row gutter={[16, 16]}>{renderProductList()}</Row>
          {productList.meta.total !== productList.data.length && (
            <Row justify="center">
              <Button
                style={{ marginTop: 16 }}
                icon={<DownOutlined />}
                onClick={() => handleShowMore()}
              >
                Hiển thị thêm
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
