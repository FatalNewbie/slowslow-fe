import React, { useState } from 'react';

function CartOrder() {
    const [productId, setProductId] = useState('');
    const [productCnt, setProductCnt] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        // 로컬 스토리지에서 물픔들을 가져옴.
        let storedUsers = JSON.parse(localStorage.getItem('orders'));
        let isExist = false;

        // 만약 비어있으면 새로 만들어서 넣어줌.
        if (storedUsers == null) {
            let order = [
                {
                    productId: Number(productId),
                    productCnt: Number(productCnt),
                    checked: true,
                },
            ];
            localStorage.setItem('orders', JSON.stringify(order));
            return;
        }

        // 안 비어있으면 기존에 존재하는 값인지 확인함
        storedUsers.map((cart) => {
            if (Number(cart.productId) === Number(productId)) {
                isExist = true;
            }
        });

        console.log(isExist);

        // 같은 값이 존재한다면 현재 갯수를 추가해줌.
        if (isExist) {
            let newStoredUsers = storedUsers.map((cart) => {
                if (cart.productId === Number(productId)) {
                    console.log(Number(cart.productCnt + productCnt));
                    return {
                        ...cart,
                        productCnt: Number(cart.productCnt) + Number(productCnt),
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

        // 안 비어있고 중복된 값이 없다면 json객채 배열에 현재 값을 추가해서 다시 로컬스토리지에 저장함.
        storedUsers.push({
            productId: Number(productId),
            productCnt: Number(productCnt),
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
                    <label htmlFor="productId">제품ID</label>
                    <input
                        type="text"
                        id="productId"
                        name="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
                <label htmlFor="productCnt">제품수량</label>
                <input
                    type="text"
                    id="productCnt"
                    name="productCnt"
                    value={productCnt}
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
