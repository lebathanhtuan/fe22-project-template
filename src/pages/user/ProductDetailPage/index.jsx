import React, { useEffect, useState } from "react";
import { Button, Radio, Input } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { ROUTES } from "../../../constants/routes";
import {
  getProductDetailAction,
  clearProductDetailAction,
  addToCartAction,
  updateCartAction,
} from "../../../redux/actions";
import * as S from "./styles";

const ProductDetailPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { productDetail } = useSelector((state) => state.product);
  const { cartList } = useSelector((state) => state.cart);

  const selectedOptionData = productDetail.data.options?.find((item) => {
    return item.id === selectedOptionId;
  });

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(clearProductDetailAction());
    };
  }, []);

  useEffect(() => {
    if (productDetail.data.id && productDetail.data.options?.length > 0) {
      setSelectedOptionId(productDetail.data.options[0].id);
    }
  }, [productDetail.data]);

  const handlePlusQuantity = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleMinusQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedOptionId) {
      const existProduct = cartList.data.find((item) => {
        return (
          item.productId === productDetail.data.id &&
          item.optionId === selectedOptionId
        );
      });
      if (existProduct) {
        dispatch(
          updateCartAction({
            productId: existProduct.productId,
            optionId: existProduct.optionId,
            quantity: existProduct.quantity + selectedQuantity,
          })
        );
      } else {
        dispatch(
          addToCartAction({
            data: {
              id: uuidv4(),
              productId: productDetail.data.id,
              productName: productDetail.data.name,
              optionId: selectedOptionId,
              optionName: selectedOptionData?.name,
              categoryName: productDetail.data.category?.name,
              quantity: selectedQuantity,
              price:
                (productDetail.data.price || 0) +
                (selectedOptionData?.bonusPrice || 0),
            },
          })
        );
      }
    } else {
      const existProduct = cartList.data.find((item) => {
        return item.productId === productDetail.data.id;
      });
      if (existProduct) {
        dispatch(
          updateCartAction({
            productId: existProduct.productId,
            quantity: existProduct.quantity + selectedQuantity,
          })
        );
      } else {
        dispatch(
          addToCartAction({
            data: {
              id: uuidv4(),
              productId: productDetail.data.id,
              productName: productDetail.data.name,
              optionId: selectedOptionId,
              optionName: selectedOptionData?.name || "",
              categoryName: productDetail.data.category?.name,
              quantity: selectedQuantity,
              price:
                (productDetail.data.price || 0) +
                (selectedOptionData?.bonusPrice || 0),
            },
          })
        );
      }
    }
  };

  const renderProductOptions = () => {
    return productDetail.data.options?.map((optionItem) => {
      return (
        <Radio key={optionItem.id} value={optionItem.id}>
          {optionItem.name}
        </Radio>
      );
    });
  };

  const renderCommentList = () => {
    return productDetail.data.comments?.map((commentItem) => {
      return (
        <div key={commentItem.id}>
          <div>{commentItem.content}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>{productDetail.data.name}</div>
      <div>
        {`${(
          (productDetail.data.price || 0) +
          (selectedOptionData?.bonusPrice || 0)
        ).toLocaleString()} VND`}
      </div>
      {productDetail.data.options?.length > 0 && (
        <Radio.Group
          onChange={(e) => setSelectedOptionId(e.target.value)}
          value={selectedOptionId}
          optionType="button"
        >
          {renderProductOptions()}
        </Radio.Group>
      )}
      <Input.Group compact>
        <Button
          icon={<MinusOutlined />}
          onClick={() => handleMinusQuantity()}
        ></Button>
        <Input
          style={{ width: 50, textAlign: "center" }}
          value={selectedQuantity}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => handlePlusQuantity()}
        ></Button>
      </Input.Group>
      <div>
        <Button onClick={() => handleAddToCart()}>Thêm vào giỏ</Button>
      </div>
      <S.Content
        dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
      />
      {userInfo.data.id ? (
        <div>Comment Form</div>
      ) : (
        <Button
          onClick={() =>
            navigate(ROUTES.LOGIN, {
              state: {
                prevPath: pathname,
              },
            })
          }
        >
          Đăng nhập
        </Button>
      )}
      {renderCommentList()}
    </div>
  );
};

export default ProductDetailPage;
