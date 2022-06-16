import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  Button,
  Table,
  Space,
  Pagination,
  Input,
  Modal,
  Select,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";

import { PAGE_SIZE } from "../../../constants/pagination";
import { ROUTES } from "../../../constants/routes";
import {
  getProductListAction,
  getCategoryListAction,
  deleteProductAction,
} from "../../../redux/actions";

const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({
    keyword: "",
    categoryIds: [],
  });
  const [modal, contextHolder] = Modal.useModal();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PAGE_SIZE.SMALL,
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
        limit: PAGE_SIZE.SMALL,
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
        limit: PAGE_SIZE.SMALL,
        categoryIds: values,
      })
    );
  }

  function handleChangePage(page) {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: page,
        limit: PAGE_SIZE.SMALL,
      })
    );
  }

  const tableColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => `${price.toLocaleString()}₫`,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            onClick={() =>
              navigate(
                generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: record.id })
              )
            }
          >
            Sửa
          </Button>
          <Button
            ghost
            danger
            onClick={() =>
              modal.confirm({
                title: "Bạn có chắc muốn xóa?",
                okType: "danger",
                onOk: (close) => {
                  dispatch(deleteProductAction({ id: record.id }));
                  close();
                },
                okText: "Xóa",
              })
            }
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const tableData = productList.data.map((item) => {
    return {
      ...item,
      key: item.id,
      categoryName: item.category.name,
    };
  });

  const formattedCategoryOptions = categoryList.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const renderFilterCategoryTabs = () => {
    return filterParams.categoryIds.map((categoryId) => {
      const categoryData = categoryList.data.find(
        (item) => item.id === categoryId
      );
      return (
        <Tag
          key={`category-tag-${categoryId}`}
          closable
          onClose={() => {
            const newCategoryIds = filterParams.categoryIds.filter(
              (id) => id !== categoryId
            );
            setFilterParams({ ...filterParams, categoryIds: newCategoryIds });
            dispatch(
              getProductListAction({
                ...filterParams,
                page: 1,
                limit: PAGE_SIZE.SMALL,
                categoryIds: newCategoryIds,
              })
            );
          }}
        >
          {categoryData.name}
        </Tag>
      );
    });
  };

  return (
    <div>
      <Row justify="space-between">
        <h3>Quản lý sản phẩm</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}
        >
          Thêm sản phẩm
        </Button>
      </Row>
      <Card>
        <Input
          onChange={(e) => handleSearchKeyword(e.target.value)}
          value={filterParams.keyword}
          placeholder="Tìm kiếm"
        />
        <Select
          mode="multiple"
          allowClear
          options={formattedCategoryOptions}
          onChange={(values) => handleFilterCategory(values)}
          value={filterParams.categoryIds}
          placeholder="Hãng sản xuất"
          style={{ width: "100%" }}
        />
      </Card>
      <Space>
        {renderFilterCategoryTabs()}
        {filterParams.keyword && (
          <Tag
            closable
            onClose={() => {
              setFilterParams({ ...filterParams, keyword: "" });
              dispatch(
                getProductListAction({
                  ...filterParams,
                  page: 1,
                  limit: PAGE_SIZE.SMALL,
                  keyword: "",
                })
              );
            }}
          >
            Từ khóa: {filterParams.keyword}
          </Tag>
        )}
      </Space>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        loading={productList.loading}
      />
      <Pagination
        current={productList.meta.page}
        total={productList.meta.total}
        onChange={(page) => handleChangePage(page)}
      />
      {contextHolder}
    </div>
  );
};

export default ProductListPage;
