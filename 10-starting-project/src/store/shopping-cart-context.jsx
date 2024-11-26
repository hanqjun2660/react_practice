import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({      // 하위 컴포넌트에서 사용하기 위한 Context
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {}
});

function shoppingCartReducer(state, action) {       // Reducer로 등록된 함수 인자로 state와 action을 Dispatch를 통해 전달 받음.
    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];      // 기존(이전) 상태의 items를 백업

        const existingCartItemIndex = updatedItems.findIndex(       // 기존 상태 items에 action.payload의 값과 동일한 id가 존재하는지 확인
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];   // 있다면 이전 items에서 해당 item을 index로 찾아 반환하여 저장

        if (existingCartItem) {     // 값이 존재한다면
            const updatedItem = {
                ...existingCartItem,                        // 이전 내용(업데이트 전 내용)은 유지
                quantity: existingCartItem.quantity + 1,    // 수량만 1증가 시킴
            };
            updatedItems[existingCartItemIndex] = updatedItem;      // 증가한 데이터를 기존 데이터에 업데이트
        } else {        // 해당 값이 존재하지 않는 경우
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);        // 더미 데이터에서 해당하는 id 찾음
            updatedItems.push({         // 새로운 데이터로 푸시
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,       // 이전 데이터들은 유지하고
            items: updatedItems     // 업데이트된 item을 넣어줌
        };
    }

    if(action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

export default function CartContextProvider({children}) {

    // useState대신 상태를 관리할 useReducer, 복잡한 상태 관리시 용이하다.
    // reducer로 연결된 함수는 Dispatch로 호출할 수 있으며, Dispatch를 통해 state와 action을 인자로 받는다.
    const [ shoppingCartState, shoppingCartDispatch ] = useReducer(shoppingCartReducer, {items: []});   // 첫번째 인자로 reducer함수 연결, 두번째 인자로 초기화

    function handleAddItemToCart(id) {      // context를 통해 하위 컴포넌트에서 사용할 수 있게 한 함수
        shoppingCartDispatch({      // useReducer의 Dispatch로 Reducer함수 호출
           type: 'ADD_ITEM',        // 구분하기 위한 구분자
           payload: id              // 필요한 값 전달
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId: productId,
                amount: amount
            }
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    };

    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
}