import {ReactElement} from 'react';
import Breadcrumb from '~/components/common/Breadcrumb';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import LayoutProfile from '~/components/layouts/LayoutProfile';
import Page from '~/components/layouts/Page';
import MainListAddress from '~/components/page/profile/MainListAddress/MainListAddress';

function ListAddress() {
	return (
		<Page disabledEffect title='Sổ địa chỉ'>
			<LayoutGrid>
				<LayoutProfile
					breadcrumb={
						<Breadcrumb
							titles={['Trang chủ', 'Thông tin cá nhân', 'Sổ địa chỉ']}
							listHref={['/', '/profile']}
						/>
					}
					title='Sổ địa chỉ'
				>
					<MainListAddress />
				</LayoutProfile>
			</LayoutGrid>
		</Page>
	);
}

export default ListAddress;

ListAddress.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
