import {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutProfile from '~/components/layouts/LayoutProfile';
import Page from '~/components/layouts/Page';
import MainProfile from '~/components/page/profile/MainProfile';

function Profile() {
	return (
		<Page disabledEffect title='Thông tin cá nhân'>
			<LayoutProfile>
				<MainProfile />
			</LayoutProfile>
		</Page>
	);
}

export default Profile;

Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
