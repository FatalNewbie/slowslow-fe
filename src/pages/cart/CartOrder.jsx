import React, { useState } from 'react';

function CartOrder() {
    const [product_Id, setProductId] = useState('');
    const [product_Cnt, setProductCnt] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        // 로컬 스토리지에서 물픔들을 가져옴.
        let storedUsers = JSON.parse(localStorage.getItem('orders'));
        let isExist = false;

        // 가져온 값이 비어있으면 새로 만들어서 넣어줌.
        if (storedUsers === null) {
            let order = [
                {
                    productId: Number(product_Id),
                    productCnt: Number(product_Cnt),
                    checked: true,
                },
            ];
            localStorage.setItem('orders', JSON.stringify(order));
            return;
        }

        // 안 비어있으면 이미 담겨져 있는 상품인지 확인함.
        storedUsers.map((cart) => {
            if (Number(cart.productId) === Number(product_Id)) {
                isExist = true;
            }
        });

        // 안 비어있고 이미 담겨져 있는 상품이라면 갯수를 추가해줌.
        if (isExist) {
            let newStoredUsers = storedUsers.map((cart) => {
                if (cart.productId === Number(product_Id)) {
                    return {
                        ...cart,
                        productCnt: Number(cart.productCnt) + Number(product_Cnt),
                    };
                }
                return cart;
            });

            // 갯수추가한 정보 로컬스토리지에 저장.
            localStorage.setItem('orders', JSON.stringify(newStoredUsers));

            //isExist 초기화
            isExist = false;

            return;
        }

        // 안 비어있고 담겨져 있는 상품이 아니라면 json객채 배열에 현재 값을 추가해서 다시 로컬스토리지에 저장함.

        storedUsers.push({
            productId: Number(product_Id),
            productCnt: Number(product_Cnt),
            checked: true,
        });
        localStorage.setItem('orders', JSON.stringify(storedUsers));
    };

    function emptyCart() {
        localStorage.clear();
    }

    return (
        <div>
            <h1>주문</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="product_Id">제품ID</label>
                    <input
                        type="text"
                        id="product_Id"
                        name="product_Id"
                        value={product_Id}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
                <label htmlFor="product_Cnt">제품수량</label>
                <input
                    type="text"
                    id="product_Cnt"
                    name="product_Cnt"
                    value={product_Cnt}
                    onChange={(e) => setProductCnt(e.target.value)}
                />
                <div></div>
                <button>장바구니에 담기</button>
            </form>
            <button onClick={emptyCart}> 장바구니 비우기 </button>
        </div>
    );
}

export default CartOrder;
