import {ReactElement} from 'react';
import Breadcrumb from '~/components/common/Breadcrumb';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import LayoutProfile from '~/components/layouts/LayoutProfile';
import Page from '~/components/layouts/Page';
import MainMyOrder from '~/components/page/profile/MainMyOrder';

function MyOrder() {
	return (
		<Page disabledEffect title='Đơn hàng của bạn'>
			<LayoutGrid>
				<LayoutProfile
					breadcrumb={
						<Breadcrumb
							titles={['Trang chủ', 'Thông tin cá nhân', 'Đơn hàng của bạn']}
							listHref={['/', '/profile']}
						/>
					}
					title='Đơn hàng của bạn'
				>
					<MainMyOrder />
				</LayoutProfile>
			</LayoutGrid>
		</Page>
	);
}

export default MyOrder;

MyOrder.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
