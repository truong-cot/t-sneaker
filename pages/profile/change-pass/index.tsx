import {ReactElement} from 'react';
import Breadcrumb from '~/components/common/Breadcrumb';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import LayoutProfile from '~/components/layouts/LayoutProfile';
import Page from '~/components/layouts/Page';
import MainChangePass from '~/components/page/profile/MainChangePass';

function ChangePass() {
	return (
		<Page disabledEffect title='Đổi mật khẩu'>
			<LayoutGrid>
				<LayoutProfile
					breadcrumb={
						<Breadcrumb
							titles={['Trang chủ', 'Thông tin cá nhân', 'Đổi mật khẩu']}
							listHref={['/', '/profile']}
						/>
					}
					title='Đổi mật khẩu'
				>
					<MainChangePass />
				</LayoutProfile>
			</LayoutGrid>
		</Page>
	);
}

export default ChangePass;

ChangePass.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
