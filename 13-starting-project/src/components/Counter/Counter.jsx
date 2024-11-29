import { useState, memo, useCallback } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

/**
 * 1. memo를 사용하면 상위 컴포넌트가 재실행 되더라도 컴포넌트 함수의 props가 변경되지 않았다면 재실행을 저지함.
 * 2. App 컴포넌트에서 관리하던 상태를 컴포넌트를 추가하여 분리하였으니 해당 컴포넌트에서 memo가 불필요하다. 하지만 일단 남겨두었다.
 */
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = isPrime(initialCount);

  const [counter, setCounter] = useState(initialCount);

  /**
   * IconButton 컴포넌트에서 memo를 사용했음에도 하위 컴포넌트들이 재실행되는 문제가 발생
   * 이를 해결하기 위해 props로 전달하는 함수가 해당 컴포넌트에서 생성되기 때문에 새로운 props로 인식하는걸 알았음.
   * useCallback 훅을 사용하여 재실행되지 않게 처리하여 전달함.
   */
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;