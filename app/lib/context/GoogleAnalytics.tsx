import Script from 'next/script';

export default function GoogleAnalytics() {
	return (
		<>
			<Script async src="https://www.googletagmanager.com/gtag/js?id=G-9PG6DER9G1"></Script>
			<Script
				id="google-analytics"
				dangerouslySetInnerHTML={{
					__html: `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-9PG6DER9G1');
  `
				}}
			></Script>
		</>
	);
}
