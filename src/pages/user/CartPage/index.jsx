import React, { useEffect, useState } from "react";
import { Row, Col, Card, Space, Image, Input, Button, Steps } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
  IdcardOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";
import { updateCartAction, removeFromCartAction } from "../../../redux/actions";
import * as S from "./styles";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { userInfo } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);
  let total = 0;
  cartList.data.forEach((item) => {
    total += item.quantity * item.price;
  });

  const handleUpdateQuantity = (type, quantity, productId, optionId) => {
    dispatch(
      updateCartAction({
        productId: productId,
        optionId: optionId,
        quantity: type === "plus" ? quantity + 1 : quantity - 1,
      })
    );
  };

  const handleRemoteFromCart = (id) => {
    dispatch(removeFromCartAction({ id }));
  };

  const renderCartList = () => {
    return cartList.data.map((cartItem) => {
      return (
        <Card size="small" key={cartItem.id} style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <Image src="https://via.placeholder.com/300" />
            </Col>
            <Col span={19}>
              <S.CardContent>
                <Row justify="space-between" align="top">
                  <div>
                    <h2 style={{ margin: 0 }}>{cartItem.productName}</h2>
                    <div>Thương hiệu: {cartItem.categoryName}</div>
                    {cartItem.optionId && (
                      <div>Tùy chọn: {cartItem.optionName}</div>
                    )}
                  </div>
                  <div>
                    <Button
                      type="text"
                      danger
                      onClick={() => handleRemoteFromCart(cartItem.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </Row>
                <Row justify="space-between" align="bottom">
                  <div>
                    <Input.Group compact>
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() =>
                          handleUpdateQuantity(
                            "minus",
                            cartItem.quantity,
                            cartItem.productId,
                            cartItem.optionId
                          )
                        }
                      ></Button>
                      <Input
                        style={{ width: 50, textAlign: "center" }}
                        value={cartItem.quantity}
                      />
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() =>
                          handleUpdateQuantity(
                            "plus",
                            cartItem.quantity,
                            cartItem.productId,
                            cartItem.optionId
                          )
                        }
                      ></Button>
                    </Input.Group>
                  </div>
                  <div>
                    <div style={{ fontSize: 20 }}>
                      {`${(
                        cartItem.price * cartItem.quantity
                      ).toLocaleString()} VND`}
                    </div>
                  </div>
                </Row>
              </S.CardContent>
            </Col>
          </Row>
        </Card>
      );
    });
  };

  return (
    <S.CartWrapper>
      <Steps style={{ marginBottom: 16 }}>
        <Steps.Step
          status="process"
          title="Giỏ hàng"
          icon={<ShoppingCartOutlined />}
        />
        <Steps.Step
          status="wait"
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
      <Row gutter={[16, 16]}>
        <Col span={17}>{renderCartList()}</Col>
        <Col span={7}>
          <Card size="small" title="Thống kê giỏ hàng">
            <S.StatisticInfo>
              <div>{cartList.data.length} sản phẩm</div>
              <div>{total.toLocaleString()} VND</div>
            </S.StatisticInfo>
            <S.StatisticInfo>
              <div>Phí vận chuyển</div>
              <div>Miễn phí</div>
            </S.StatisticInfo>
            <S.StatisticInfo>
              <div>Mã giảm giá</div>
              <div>Không có</div>
            </S.StatisticInfo>
            <Card.Meta
              title={
                <S.StatisticTotal>
                  <div>Tổng tiền</div>
                  <div>{total.toLocaleString()} VND</div>
                </S.StatisticTotal>
              }
            />
          </Card>
        </Col>
      </Row>
      <Row justify="space-between">
        <Button>Mua thêm</Button>
        <Button
          type="primary"
          disabled={!cartList.data.length}
          onClick={() => navigate(ROUTES.USER.SHIPMENT_INFO)}
        >
          Tiếp tục
        </Button>
      </Row>
    </S.CartWrapper>
  );
};

export default CartPage;
