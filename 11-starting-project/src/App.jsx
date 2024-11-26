import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

/* 이렇게 즉시 데이터를 가져와 처리할 수 있는 경우 useEffect로 사용할 필요가 없다. */
// 로컬 스토리지에 존재하는 장소 id 가져옴
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
// 로컬 스토리지에 존재하는 장소 id를 AVAILABLE_PLACES에서 찾아서 해당되는 데이터만 가져옴
const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {

  const selectedPlace = useRef();
  const[modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  /*
    useEffect는 다른 React Hook과 다르게 값을 반환하지 않음.
    대신 부수효과(side effect) 코드를 첫번째 인자, 두번째 인자는 의존성 배열을 넣어줘야 함.
    실행 시점은 컴포넌트 함수가 실행 완료후 실행되기 때문에 즉시 실행되지 않음. 즉 무한루프를 해결할 수 있음
   */
  useEffect(() => {
    // 위치를 가져오기 위한 함수(해당 함수는 콜백 함수를 필요로 함)
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    });
  }, []);   // 의존성 값을 보고 Effect 함수를 재실행할것인지 판단함.


  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /*
      앱을 다시 로딩했을 때 선택한 장소들의 상태가 그대로 유지되게 해봄(로컬 스토리지 사용)
      리액트 앱의 랜더링과 상관없는 부수효과 코드이지만 상태를 변경하지 않는다.
      이런경우 useEffect를 사용하지 않아도 된다.(그리고 해당 코드는 함수내 있기 때문에 useEffect 사용시 hook 규칙을 위반한다.)
     */
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if(storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    // 로컬 스토리지에 있는 데이터 삭제
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)))
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={handleRemovePlace}
          />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
