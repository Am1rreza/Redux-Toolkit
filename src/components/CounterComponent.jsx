import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/counter/CounterSlice";

const CounterComponent = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter State</h1>
      <h2>Counter : {counter.value}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default CounterComponent;
