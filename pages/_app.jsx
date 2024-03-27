import Head from 'next/head';
import '../styles/global.css';
import Monitoring from  '../components/Monitoring/Monitoring';

export default function App() {
  return (
    <div className="h-full bg-black ">
      <Head>
        <title>Trading Signals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-fit text-white bg-black">
      <Monitoring/>
      </div>
    </div>
  );
}
