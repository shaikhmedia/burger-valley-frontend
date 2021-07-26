import styles from "@styles/account/currentOrder.module.css";
import { useState } from "react";

const CurrentOrder = ({ orders }) => {
  // Get the order which is placed in last hour
  const latestOrders = orders.filter((order) => {
    if (
      new Date().getTime() / 1000 -
        new Date(order.createdAt).getTime() / 1000 <=
      3600
    ) {
      return order;
    }
  });

  let latestOrder;

  // Check if there is a current order and update the state
  if (latestOrders.length > 0) {
    latestOrder = latestOrders.map((order) => (
      <div className={styles.Order} key={order.id}>
        <div className={styles.Main}>
          <div className={styles.TypeDate}>
            <p className={styles.Title}>{order.Type} Burger</p>
            <small>{new Date(order.createdAt).toDateString()}</small>
          </div>
          <ul>
            <li>{order.Salad}x salad,</li>
            <li>{order.Cheese}x cheese,</li>
            <li>{order.Bacon}x bacon,</li>
            <li>
              {order.Patty}x {order.Type.toLowerCase()} patty,
            </li>
            <li>1x {order.Side} fries and drink</li>
          </ul>
        </div>

        <div className={styles.ItemsToRemove}>
          <p className={styles.Title}>Items To Remove</p>
          <div className={styles.Items}>Hello</div>
        </div>

        <div className={styles.PriceReorder}>
          <p className={styles.Title}>Total amount: ${order.TotalPrice}</p>
        </div>
      </div>
    ));
  } else {
    latestOrder = (
      <p className={styles.NoOrder}>
        You don't have any order placed at the moment
      </p>
    );
  }

  return <>{latestOrder}</>;
};

export default CurrentOrder;
