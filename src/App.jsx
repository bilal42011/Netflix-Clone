import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/app/slices/counterSlice'
import HomeScreen from '@/components/HomeScreen';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>Increment by 10</button>
      <HomeScreen />
    </div>
  )
}

export default App
