import {AppProps} from 'next/app';
import type {NextPage} from 'next';
import {store} from '~/redux/store';
import {Provider} from 'react-redux';
import {ReactElement, ReactNode} from 'react';
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
		<Provider store={store}>
			<ToastContainer autoClose={3000} />
			<SplashScreen />
			<LoadingTopBar />
			<UpdateRoute />
			{getLayout(<Component {...pageProps} />)}
		</Provider>
	);
}

export default MyApp;
