import LikeButton from './components/LikeButton/LikeButton';
import SlideWithThumb from './components/SlideWithThumb/SlideWithThumb';
import ButtonTabs from './components/ButtonTabs/ButtonTabs';
import ButtonTabs1 from './components/ButtonTabs1/ButtonTabs1';
import ButtonAccordion from './components/SingleAccordion/ButtonAccordion';
import MultiAccordion from './components/MultiAccordion/MultiAccordion';
import './App.css';

const images = [
  "./images/maygiat.jpg",
  "./images/camera.jpg",
  "./images/sofa.jpg",
  "./images/book.jpg",
  "./images/headphone.jpg",
  "./images/loa.jpg",
];
const tabs = [
  { label: "HISTORY", content: <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</div> },
  { label: "APPROACH", content: <div>Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</div> },
  { label: "CULTURE", content: <div>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.</div> },
  { label: "METHOD", content: <div>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</div> },
];
const items = [
  { title: "HISTORY", content: <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</div> },
  { title: "APPROACH", content: <div>Contenido de tabNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</div> },
  { title: "CULTURE", content: <div>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.</div> },
  { title: "METHOD", content: <div>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</div> },
];

function App() {
  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <span style={{ fontSize: '30px', fontWeight: 'bold', padding: '10px' }}>Like Button</span>
      <LikeButton />
      <span style={{ fontSize: '30px', fontWeight: 'bold', padding: '10px' }}>Slide With Thumbnail</span>
      <div style={{justifyContent: 'center'}}>
      <SlideWithThumb images={images} />
      </div>
      <span style={{ fontSize: '30px', fontWeight: 'bold', padding: '10px' }}>Button Tabs</span>
      <ButtonTabs tabs={tabs} />
      <ButtonTabs1 tabs={tabs} />
      <span style={{ fontSize: '30px', fontWeight: 'bold', padding: '10px' }}>Button Accordion</span>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
      <section style={{paddingLeft: '10px', position: 'relative'}}>
      <p>Single Accordtions</p>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
        <ButtonAccordion items={items} />
        </div>
        </section>
      <section style={{paddingLeft: '10px', position: 'relative'}}>
      <p>Multi Accordions</p>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
        <MultiAccordion items={items} />
      </div>
      </section>
      </div>
      
    </div>
  );
}
export default App;