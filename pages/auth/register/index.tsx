import React from 'react';
import Page from '~/components/layouts/Page';
import FormRegister from '~/components/page/auth/FormRegister';

function Register() {
	return (
		<Page disabledEffect title='Đăng kí'>
			<FormRegister />
		</Page>
	);
}

export default Register;
