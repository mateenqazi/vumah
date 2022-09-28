import React from 'react';

import Image1 from '../../../assets/img/blog/1.png'
import Image2 from '../../../assets/img/blog/2.png'
import Image3 from '../../../assets/img/blog/3.png'
import Image4 from '../../../assets/img/blog/4.png'
import Image5 from '../../../assets/img/blog/5.png'

import Related1 from '../../../assets/img/blog/related-1.png';
import Related2 from '../../../assets/img/blog/related-2.png';
import Related3 from '../../../assets/img/blog/related-3.png';

export default function Blog2() {
  return (
    <div className="about-section" style={{ width: '100%' }}>
      <div className="about-banner about-banner--blog-2 mb-5">
        <div className="container d-flex" style={{ alignItems: 'flex-start', flexDirection: 'column', height: 'inherit', justifyContent: 'center' }}>
          <h1 className="mb-2" style={{ color: '#fff', fontSize: '38px', lineHeight: 1 }}>
            Top 5 Places To Visit In The UK
          </h1>
          
        </div>
      </div>

      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <img className="mb-5" src={ Image1 } width="100%" height="auto" style={{ maxWidth: '500px' }} />
          </div>
          <div className="col-12 col-lg-6">
            <h2><span style={{ color: '#F67810' }}>1)</span> London: The capital</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              London is a melting pot of culture and one of the top tourist destinations in the world, with plenty of attractions to keep you busy. If you are interested in learning about the UK's rich history, then you must visit the tower of London. Right beside the Tower Bridge, a former palace and prison includes has fascinating medieval treasures, displays of armour, and most of all it contains the home to the Crown Jewels, the Jewel house.
            </p>

            <p style={{ textAlign: 'justify' }}>
              If you are a fan of the Royal Family you will want to head to the Buckingham Palace, and book a tour of the Palace's State Rooms, and don’t forget the iconic Big Ben and Parliament Buildings, as you do not want to miss these when you are in London!
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-6 order-lg-2 d-flex justify-content-center">
            <img className="mb-5 ml-auto" src={ Image2 } width="100%" height="auto" style={{ maxWidth: '500px' }} />
          </div>
          <div className="col-12 col-lg-6 order-lg-1">
            <h2><span style={{ color: '#F67810' }}>2)</span> Edinburgh</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              The capital of Scotland, also one of the most visited cities in the. Well known for their impressive historic buildings, and best known for their beautiful Edinburgh Castle.
            </p>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              From the castle, you can easily access other important historic sites within the city, such as the Old Town's Royal Mile with its fine architecture, cafés, and art galleries.
            </p>

            <p style={{ textAlign: 'justify' }}>
              Considering experiences such as work exchange programs would allow you more time to immerse yourself in a new culture.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <img className="mb-5" src={ Image3 } width="100%" height="auto" style={{ maxWidth: '500px' }} />
          </div>
          <div className="col-12 col-lg-6">
            <h2><span style={{ color: '#F67810' }}>3)</span> Brighton</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

            <p style={{ textAlign: 'justify' }}>
              Brighton is not your typical British seaside resort, take a look below the surface and you will find, great cuisines, vintage shops and many pubs. Come and explore the Victorian history of this city and attractions such as the Brighton Palace Pier, dig in to freshly prepared fish and chips, or enjoy nature at the white cliffs and woodlands of the South Downs National Park. Enjoy everything the city has to offer from the wildlife to the seaside.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-6 order-lg-2 d-flex justify-content-center">
            <img className="mb-5 ml-auto" src={ Image4 } width="100%" height="auto" style={{ maxWidth: '500px' }} />
          </div>
          <div className="col-12 col-lg-6 order-lg-1">
            <h2><span style={{ color: '#F67810' }}>4)</span> Stonehenge</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              One of the oldest sites on the planet, covering an area of more than 20 square kilometres, Stonehenge has been a place of pilgrimage for more than 4,500 years. This site has been believed to be an ancient place of worship, but now magnificent monument attracting tourists all over the world. Make sure to plan ahead and purchase a ticket before they run out!
            </p>

            <p className="mb-3" style={{ textAlign: 'justify' }}>
              Also, with just 16-kilometre drive south of Stonehenge, you'll be able to visit one of the country's most famous cathedrals, which dates back to 1220 and was the home to an original Magna Carta.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="grid row">
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <img className="mb-5" src={ Image5 } width="100%" height="auto" style={{ maxWidth: '500px' }} />
          </div>
          <div className="col-12 col-lg-6">
            <h2><span style={{ color: '#F67810' }}>5)</span> York</h2>

            <div className="my-4" style={{ background: '#F67810', display: 'block', height: '2px', width: '85px' }}></div>

            <p style={{ textAlign: 'justify' }}>
              York remains one of the top destinations to travel to, and the reason for this is because the city is known for having longest circuit of medieval city walls, which stretches nearly three miles, offering stunning views of the city. The city is also filled with many fun things to do and attractions such as the York Minster, which is the largest medieval church in England. Visiting these sites should definitely be near the top of your York travel itinerary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
