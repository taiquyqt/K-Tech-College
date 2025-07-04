import LogoRender1 from './components/Render1/LogoRender'
import './App.css'
import LogoRender4 from './components/Render4/Render4'
import LogoRender5 from './components/Render5/Render5'
import styles from './components/Render1/Render1.module.css'

function App() {
  return (
    <div className="container">
      {/* render1 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>TIN MỚI</h2>
        <a href="#" style={{ color: '#222', fontWeight: 500, textDecoration: 'none' }}>Xem thêm</a>
      </div>
      <div className={styles.wrapper}>
        <LogoRender1 src='/images/a32.jpg'
          text='Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz'
          time='110 lượt xem'
        />
        <LogoRender1 src='/images/pixel.jpg'
          text='Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12'
          time='169 lượt xem'
        />
        <LogoRender1 src='/images/a52.jpg'
          text='Galaxy A52 4G lộ diện trên Google Play Console Xác nhận dùng chip Snapdragon 720'
          time='137 lượt xem'
        />
        <LogoRender1 src='/images/a82.jpg'
          text='Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa'
          time='10 lượt xem'
        />  
      </div>
      {/* render4 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, bottom:20}}>Phụ kiện tương thích</h2>
      </div>
      <div className={styles.wrapper}>
        <LogoRender4 src='/images/hdmi.jpg'
          text= "Cáp chuyển đổi USB-C sang SD"
          time='1.290.000đ'
          discount='-25%'
          oldPrice='790.000đ'
        />
        <LogoRender4 src='/images/cucsac.jpg'
          text='Adapter sạc Apple Type C 20W'
          time='520.000đ'
        />
        <LogoRender4 src='/images/type-c.jpg'
          text='Cáp xạc Lightning 2m'
          time='840.000đ'
        />
        <LogoRender4 src='/images/airport.jpg'
          text='Airport 3'
          time='890.000đ'
          discount='-20%'
          oldPrice='1.450.000đ'
        />  
      </div>
      {/* render5 */}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, bottom: 20 }}>Deal of the day</h2>
        <a href="#" style={{ color: '#222', fontWeight: 500, textDecoration: 'none' }}>View all</a>

      </div>
      <div className={styles.wrapper}>
        <LogoRender5
          image='/images/maygiat.jpg'
          discount='-39%'
          shopName='YOUNG SHOP'
          currentPrice='$1,422.7'
          oldPrice='$1,025.5'
          percentOff='18% off'
          title='LG White Front Load Steam Washer'
          stars={4}
          sold={10}
        />
        <LogoRender5
          image='/images/loa.jpg'
          discount='-39%'
          shopName='YOUNG SHOP'
          currentPrice='$1,422.7'
          oldPrice='$1,025.5'
          percentOff='18% off'
          title='LG White Front Load Steam Washer'
          stars={4}
          sold={10}
        />
        <LogoRender5
          image='/images/camera.jpg'
          discount='-39%'
          shopName='YOUNG SHOP'
          currentPrice='$1,422.7'
          oldPrice='$1,025.5'
          percentOff='18% off'
          title='LG White Front Load Steam Washer'
          stars={4}
          sold={15}
        />
        <LogoRender5
          image='/images/book.jpg'
          discount='-39%'
          shopName='YOUNG SHOP'
          currentPrice='$1,422.7'
          oldPrice='$1,025.5'
          percentOff='18% off'
          title='LG White Front Load Steam Washer'
          stars={4}
          sold={22}
        />
        <LogoRender5
          image='/images/headphone.jpg'
          discount='-39%'
          shopName='YOUNG SHOP'
          currentPrice='$1,422.7'
          oldPrice='$1,025.5'
          percentOff='18% off'
          title='LG White Front Load Steam Washer'
          stars={4}
          sold={10}
        />
        <LogoRender5
          image='/images/sofa.jpg'
          discount='-39%'
          shopName='YOUNG SHOP'
          currentPrice='$1,422.7'
          oldPrice='$1,025.5'
          percentOff='18% off'
          title='LG White Front Load Steam Washer'
          stars={4}
          sold={79}
        />
      </div>
      
    </div>
    
  )
}

export default App