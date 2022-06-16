import React, { useEffect } from "react";
import { Button } from "antd";
import { useParams, useNavigate, generatePath } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("Gọi data detail của product dự theo ", id);
  }, [id]);

  return (
    <div>
      <div>Chi tiết sản phẩm - {id}</div>
      <Button
        onClick={() =>
          navigate(
            generatePath(ROUTES.ADMIN.PRODUCT_DETAIL, {
              id: 1,
            })
          )
        }
      >
        Sản phẩm tương tự
      </Button>
    </div>
  );
};

export default ProductDetailPage;
