import React from 'react';
import Page from '~/components/layouts/Page';
import FormRegister from '~/components/page/auth/FormRegister';
import RequiredLogout from '~/components/protected/RequiredLogout';

function Register() {
	return (
		<RequiredLogout>
			<Page disabledEffect title='Đăng kí'>
				<FormRegister />
			</Page>
		</RequiredLogout>
	);
}

export default Register;
