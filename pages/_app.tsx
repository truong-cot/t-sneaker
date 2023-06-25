import type {NextPage} from 'next';
import {AppProps} from 'next/app';
import {ReactElement, ReactNode} from 'react';
import {ToastContainer} from 'react-toastify';
import UpdateRoute from '~/components/common/UpdateRoute';
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
import '~/styles/globals.scss';

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
		<>
			<ToastContainer autoClose={3000} />
			<SplashScreen />
			<LoadingTopBar />
			<UpdateRoute />
			{getLayout(<Component {...pageProps} />)}
		</>
	);
}

export default MyApp;
