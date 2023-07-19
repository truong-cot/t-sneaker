import {ReactElement} from 'react';
import Breadcrumb from '~/components/common/Breadcrumb/Breadcrumb';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import LayoutProfile from '~/components/layouts/LayoutProfile';
import Page from '~/components/layouts/Page';
import MainProfile from '~/components/page/profile/MainProfile';

function Profile() {
	return (
		<Page disabledEffect title='Thông tin cá nhân'>
			<LayoutGrid>
				<LayoutProfile
					breadcrumb={<Breadcrumb titles={['Trang chủ', 'Thông tin cá nhân']} listHref={['/']} />}
					title='Thông tin cá nhân'
				>
					<MainProfile />
				</LayoutProfile>
			</LayoutGrid>
		</Page>
	);
}

export default Profile;

Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
