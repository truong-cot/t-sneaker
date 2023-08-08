import {AppProps} from 'next/app';
import type {NextPage} from 'next';
import {store} from '~/redux/store';
import {Provider} from 'react-redux';
import {Fragment, ReactElement, ReactNode} from 'react';
import {ToastContainer} from 'react-toastify';
import UpdateRoute from '~/components/protected/UpdateRoute';
import LoadingTopBar from '~/components/common/LoadingTopBar';
import SplashScreen from '~/components/protected/SplashScreen';

// Import style
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import '~/styles/globals.scss';

import Head from 'next/head';
import icons from '~/constants/images/icons';

// Khai báo type page
type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<Fragment>
			<Head>
				<title>{process.env.NEXT_PUBLIC_TITLE_PAGE}</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta property='og:type' content='website' />
				<meta name='description' content={process.env.NEXT_PUBLIC_DES} />
				<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
				<meta property='og:title' content={process.env.NEXT_PUBLIC_TITLE_PAGE} />
				<meta property='og:image' content={icons.logo_small.src} />
			</Head>
			<Provider store={store}>
				<ToastContainer autoClose={3000} />
				<SplashScreen />
				<LoadingTopBar />
				<UpdateRoute />
				{getLayout(<Component {...pageProps} />)}
			</Provider>
		</Fragment>
	);
}

export default MyApp;
