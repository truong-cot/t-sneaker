import {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import Page from '~/components/layouts/Page';
import MainProduct from '~/components/page/product/MainProduct';

function Product() {
	return (
		<Page disabledEffect title='Chi tiết sản phẩm'>
			<LayoutGrid>
				<MainProduct />
			</LayoutGrid>
		</Page>
	);
}

export default Product;

Product.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
