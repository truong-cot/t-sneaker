import React from 'react';
import {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import Page from '~/components/layouts/Page';
import MainPayment from '~/components/page/payment/MainPayment';
import RequireAuth from '~/components/protected/RequiredAuth';

function Payment() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Thanh toán'>
				<LayoutGrid>
					<MainPayment />
				</LayoutGrid>
			</Page>
		</RequireAuth>
	);
}

export default Payment;

Payment.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
