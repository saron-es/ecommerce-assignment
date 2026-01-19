import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { placeOrder } from "../../api/api";

const PlaceOrder = ({ products }) => {
  const { token } = useContext(AppContext);

  const handlePlaceOrder = async () => {
    const orderItems = products.map(p => ({ productId: p.id, quantity: 1 }));
    const res = await placeOrder(orderItems, token);
    alert(res.message);
  };

  return <button onClick={handlePlaceOrder}>Place Order</button>;
};

export default PlaceOrder;
