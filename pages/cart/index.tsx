import React from 'react';
import {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import Page from '~/components/layouts/Page';
import MainCart from '~/components/page/cart/MainCart';

function Cart() {
	return (
		<Page disabledEffect title='Giỏ hàng'>
			<LayoutGrid>
				<MainCart />
			</LayoutGrid>
		</Page>
	);
}

export default Cart;

Cart.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
