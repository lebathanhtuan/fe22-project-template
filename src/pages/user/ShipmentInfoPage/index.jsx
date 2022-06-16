import React, { useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Form,
  Card,
  Input,
  Select,
  Steps,
} from "antd";
import {
  ShoppingCartOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  paymentOrderAction,
} from "../../../redux/actions";
import { ROUTERS } from "../../../constants/routes";
// import { SHIP_FEE } from "../../constants/cart";
import * as S from "./styles";

const ShipmentInfo = () => {
  const [shipmentInfoForm] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  const handleOrder = (values) => {
    // dispatch(
    //   paymentOrderAction({
    //     data: {
    //       userId: userInfo.data.id,
    //       products: [...cartList.data],
    //       totalPrice: provisionalPrice + SHIP_FEE,
    //       info: {
    //         ...values,
    //         city:
    //           cityList.data.find((city) => city.code === values.city)?.name ||
    //           "",
    //         district:
    //           districtList.data.find(
    //             (district) => district.code === values.district
    //           )?.name || "",
    //         ward:
    //           wardList.data.find((ward) => ward.code === values.ward)?.name ||
    //           "",
    //       },
    //       payment: {},
    //     },
    //     callback: {
    //       goToHome: () => navigate(ROUTERS.HOME),
    //     },
    //   })
    // );
  };

  const renderCityOptions = () => {
    return cityList.data.map((cityItem) => {
      return (
        <Select.Option key={cityItem.id} value={cityItem.code}>
          {cityItem.name}
        </Select.Option>
      );
    });
  };

  const renderDistrictOptions = () => {
    return districtList.data.map((districtItem) => {
      return (
        <Select.Option key={districtItem.id} value={districtItem.code}>
          {districtItem.name}
        </Select.Option>
      );
    });
  };

  const renderWardOptions = () => {
    return wardList.data.map((wardItem) => {
      return (
        <Select.Option key={wardItem.id} value={wardItem.code}>
          {wardItem.name}
        </Select.Option>
      );
    });
  };

  return (
    <S.ShipmentInfoWrapper>
      <Steps style={{ marginBottom: 16 }}>
        <Steps.Step
          status="finish"
          title="Giỏ hàng"
          icon={<ShoppingCartOutlined />}
        />
        <Steps.Step
          status="process"
          title="Thông tin giao hàng"
          icon={<IdcardOutlined />}
        />
        <Steps.Step
          status="wait"
          title="Thanh toán"
          icon={<CreditCardOutlined />}
        />
        <Steps.Step
          status="wait"
          title="Hoàn tất"
          icon={<CheckCircleOutlined />}
        />
      </Steps>
      <Card size="small" title="Thông tin cá nhân" style={{ marginTop: 24 }}>
        <Form
          form={shipmentInfoForm}
          name="shipmentInfo"
          layout="vertical"
          initialValues={{
            name: userInfo.data.fullName,
            email: userInfo.data.email,
          }}
          onFinish={(values) => handleOrder(values)}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Tên khách hàng"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tỉnh/Thành phố"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Select
                  allowClear
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    shipmentInfoForm.setFieldsValue({
                      district: undefined,
                      ward: undefined,
                    });
                  }}
                >
                  {renderCityOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quận/Huyện"
                name="district"
                rules={[
                  { required: true, message: "Please input your district!" },
                ]}
              >
                <Select
                  allowClear
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    shipmentInfoForm.setFieldsValue({ ward: undefined });
                  }}
                >
                  {renderDistrictOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phường/Xã"
                name="ward"
                rules={[{ required: true, message: "Please input your ward!" }]}
              >
                <Select allowClear>{renderWardOptions()}</Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ cụ thể"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row justify="space-between">
        <Button>Trở lại</Button>
        <Button type="primary" onClick={() => shipmentInfoForm.submit()}>
          Thanh toán
        </Button>
      </Row>
    </S.ShipmentInfoWrapper>
  );
};

export default ShipmentInfo;
