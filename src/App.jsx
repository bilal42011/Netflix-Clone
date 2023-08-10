import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from './app/slices/counterSlice'
import { Outlet } from 'react-router-dom';
import Nav from "./components/Nav";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();


  return (
    <>
      {/* <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</button> */}
      <Nav />
      <Outlet />
    </>
  )
}

export default App
