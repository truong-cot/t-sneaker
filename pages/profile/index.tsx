import {ReactElement} from 'react';
import Breadcrumb from '~/components/common/Breadcrumb/Breadcrumb';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import LayoutProfile from '~/components/layouts/LayoutProfile';
import Page from '~/components/layouts/Page';
import MainProfile from '~/components/page/profile/MainProfile';
import RequireAuth from '~/components/protected/RequiredAuth';

function Profile() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Thông tin cá nhân'>
				<LayoutGrid>
					<LayoutProfile
						title='Thông tin cá nhân'
						breadcrumb={<Breadcrumb titles={['Trang chủ', 'Thông tin cá nhân']} listHref={['/']} />}
					>
						<MainProfile />
					</LayoutProfile>
				</LayoutGrid>
			</Page>
		</RequireAuth>
	);
}

export default Profile;

Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
