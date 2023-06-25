import {Fragment} from 'react';
import Head from 'next/head';
import clsx from 'clsx';

function Page({
	children,
	title,
	disabledEffect,
}: {
	children: any;
	title: string;
	disabledEffect?: boolean;
}) {
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />\
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1'
				></meta>
			</Head>
			<div className={clsx({effectShow: !disabledEffect})}>
				{children}
			</div>
		</Fragment>
	);
}

export default Page;
