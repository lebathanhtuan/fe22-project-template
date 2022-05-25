import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { InputNumber, Button } from "antd";
import { NameContext } from "../../App";

function goiAPI() {
  console.log("Gọi API");
}

const ProductListPage = () => {
  const [pin1, setPin1] = useState(0);
  const [pin2, setPin2] = useState(0);
  const [pin3, setPin3] = useState(0);
  const [pin4, setPin4] = useState(0);

  const { name, setName } = useContext(NameContext);

  useEffect(() => {
    goiAPI();
  }, []);

  useEffect(() => {
    if (
      pin1 === 5 &&
      pin2 === 3 &&
      pin3 === 2 &&
      pin4 === 1 &&
      name === "Tuấn"
    ) {
      console.log("Unlock");
    }
  }, [pin1, pin2, pin3, pin4, name]);

  useEffect(() => {
    return () => {
      setName("");
      console.log("Mới thoát Product List Page");
    };
  }, []);

  // function renderName() {
  //   console.log("renderName");
  //   return <div>Danh sách sản phẩn - {name}</div>;
  // }

  const renderName = useMemo(() => {
    console.log("renderName");
    return <div>Danh sách sản phẩn - {name}</div>;
  }, [name]);

  // function renderInput() {
  //   console.log("renderInput");
  //   return (
  //     <div>
  //       <InputNumber onChange={(value) => setPin1(value)} />
  //       <InputNumber onChange={(value) => setPin2(value)} />
  //       <InputNumber onChange={(value) => setPin3(value)} />
  //       <InputNumber onChange={(value) => setPin4(value)} />
  //     </div>
  //   );
  // }

  const renderInput = useMemo(() => {
    console.log("renderInput");
    return (
      <div>
        <InputNumber
          value={pin1}
          onChange={(value) => setPin1(value)}
        />
        <InputNumber
          value={pin2}
          onChange={(value) => setPin2(value)}
        />
        <InputNumber
          value={pin3}
          onChange={(value) => setPin3(value)}
        />
        <InputNumber
          value={pin4}
          onChange={(value) => setPin4(value)}
        />
      </div>
    );
  }, [pin1, pin2, pin3, pin4]);

  return (
    <div>
      <Button onClick={() => setName("Tuấn")}>
        Set Name
      </Button>
      {renderName}
      {renderInput}
    </div>
  );
};

export default ProductListPage;
