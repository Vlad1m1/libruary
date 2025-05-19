import { AppProps } from 'next/app'
import '../styles/globals.css'

import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';

async function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<NextIntlClientProvider
			locale={router.locale}
			timeZone="Europe/Vienna"
			messages={pageProps.messages}
		>
			<Component {...pageProps} />
		</NextIntlClientProvider>
	)
}

export default MyApp;

export async function getStaticProps(context) {
	return {
		props: {
			messages: (await import(`../messages/${context.locale}.json`)).default
		}
	};
}
