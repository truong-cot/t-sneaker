import React, {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import Page from '~/components/layouts/Page';
import MainShop from '~/components/page/shop/MainShop';

function Shop() {
	return (
		<Page disabledEffect title='Cửa hàng'>
			<LayoutGrid>
				<MainShop />
			</LayoutGrid>
		</Page>
	);
}

export default Shop;

Shop.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
