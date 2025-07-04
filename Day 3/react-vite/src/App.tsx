
import './App.css'
import Bai2 from './components/Bai2';
import { MoveRight, Search, SlidersVertical, Wifi, Phone, Apple, Chrome, Facebook } from 'lucide-react';
import Button from './components/Button';
import Frame3 from './components/Frame3';
import Frame4 from './components/Frame4';
import Frame5 from './components/Frame5';
import Frame6 from './components/Frame6';
import Frame7 from './components/Frame7';



function App() {
  return (
    <div className='container'>
      <div className='frame1'>
        <Button type='primary' label="Get started" rightIcon={<MoveRight size={16} />} />
        <Button type='primary' leftIcon={<Apple size={16} />} label="Countinue with Apple" />
        <Button type='outline' leftIcon={<Chrome size={16} />} label="Countinue with Chrome" />
        <Button type='outline' leftIcon={<Facebook size={16} />} label="Countinue with Facebook" />
      </div>
      <div className='frame2'>
        <Bai2 leftIcon={<Search size={16} />} label={''} />
        <Bai2 leftIcon={<Search size={16} />} label={'Search'} />
        <Bai2 leftIcon={<Search size={16} />} label={<span style={{ fontWeight: 'bold' }}>Textfield</span>} />
        <Bai2 leftIcon={<Search size={16} />} label={'Search in the web'} rightIcon={<Wifi size={16} />} />
        <Bai2 leftIcon={<Search size={16} />} label={'Search crypto'} rightIcon={<SlidersVertical size={16} />} />
        <Bai2 label={'Phone number'} rightIcon={<span style={{ backgroundColor: '#d3f3ff', borderRadius: 8, padding: 4 }}><Phone size={18} /></span>} />
        <Bai2 leftIcon={<Search size={16} />} label={'Search in the web'} rightIcon={<span style={{ backgroundColor: '#c9eb1a', borderRadius: 8, padding: 2 }}><Wifi size={18} /></span>} />
      </div>
      <Frame3
        score={{
          time: "7'",
          homeTeam: 'Spain',
          homeFlag: 'https://flagcdn.com/w40/es.png',
          awayTeam: 'France',
          awayFlag: 'https://flagcdn.com/w40/fr.png',
          result: '0 : 0',
        }}
        club={{
          name: 'Manchester United',
          logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
        }}
        user={{
          name: 'Wade Warren',
          image: 'https://randomuser.me/api/portraits/men/75.jpg',
          cardNumber: '4293 3242 ••••',
        }}
        dashboard={{
          tags: ['Highlight', 'Feeds'],
          title: 'Dashboard',
          subtitle: 'Business management service',
          progress: 80,
        }}
      />
      <Frame4
        topUser={{
          name: 'Yolanda',
          role: 'Web Development',
          avatar: '/images/avatar.png',
        }}
        bottomUser={{
          name: 'María',
          avatar: '/images/avatar-nu.png',
        }}
      />

      <div className="frame5">

        <Frame5
          avatar='/images/avatar.png'
          name="Miriam Jimenez"
          bgColor="#16c4e2"
        />

        <Frame5
          members={['/images/avatar5.png', '/images/avatar6.png', '/images/avatar-nu.png']}
          name="Teams"
          description="Two currently"
          bgColor="#7300f7"
        />

        <Frame5
          members={['/images/avatar6.png', '/images/avatar5.png']}
          name="New Teams"
          bgColor="#f9e800"
        />
      </div>
      <Frame6
        transaction={{
          logo: '/images/nike.png',
          name: 'Nike store',
          description: '6 months of promotions',
          amount: '-27.50',
          time: '11:00AM',
        }}
        notificationText="All your notifications are well turned on"
        notificationCount={3}
      />
      <div className=''>
       
        <Frame7
          city="Seattle"
          condition="Cloudy"
          temperature="32°"
          icon="/images/tue.png"
          gradient
        />
        <Frame7
          forecast={[
            { day: 'Mon', icon: '/images/mon.png', time: '02:27 PM' },
            { day: 'Tue', icon: '/images/tue.png', time: '06:00 AM' },
            { day: 'Wed', icon: '/images/wed.png', time: '07:30 PM' },
            { day: 'Thu', icon: '/images/thu.png', time: '12:00 PM' },
            { day: 'Fri', icon: '/images/fri.png', time: '04:00 PM' },
          ]}
        />

      </div>


    </div>

  )
}

export default App