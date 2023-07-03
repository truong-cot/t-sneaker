import React from 'react';
import Page from '~/components/layouts/Page';
import FormLogin from '~/components/page/auth/FormLogin';

function Login() {
	return (
		<Page disabledEffect title='Đăng nhập'>
			<FormLogin />;
		</Page>
	);
}

export default Login;
