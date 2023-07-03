import React, {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import Page from '~/components/layouts/Page';
import BannerHome from '~/components/page/home/BannerHome';
import CategoryHome from '~/components/page/home/CategoryHome';
import DiscountProducts from '~/components/page/home/DiscountProducts';
import FeedbackCustomers from '~/components/page/home/FeedbackCustomers';
import HotsProduct from '~/components/page/home/HotsProduct';
import NewProduct from '~/components/page/home/NewProduct';

function Home() {
	return (
		<Page disabledEffect title='Trang chủ'>
			<BannerHome />
			<CategoryHome />
			<DiscountProducts />
			<HotsProduct />
			<NewProduct />
			<FeedbackCustomers />
		</Page>
	);
}

export default Home;

Home.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
