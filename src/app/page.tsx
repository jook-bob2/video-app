import HomeVideoList from '../components/home/HomeVideoList';

export default function Home() {
  return (
    <section>
      {/* <Link href={{ pathname: '/live/view', query: { mcid: 'test111', partnerCode: 'P-00001' } }}>시청화면</Link>
      <Link href={{ pathname: '/test/button' }}>버튼테스트</Link> */}
      <h1 className='mb-4 text-xl font-bold text-light-text dark:text-dark-text-1'>비디오 목록</h1>
      <HomeVideoList />
    </section>
  );
}
