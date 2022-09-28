import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import blogImg7 from '../../../assets/img/blog-img-7.jpg';
import blogImg1 from '../../../assets/img/blog-img-1.jpg';
import blogImg8 from '../../../assets/img/blog-img-8.jpg';
import blogImg9 from '../../../assets/img/blog-img-9.jpg';
import blogImg6 from '../../../assets/img/blog-img-6.jpg';

export default function Blog2() {
  return (

    <section class="blog-detail padd-bottom-60 padd-top-60">
        <div class="container">
            <div class="blog-right ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="blog-right-grid mb-5" data-aos="fade-up">
                            <h2>Top 5 places to visit in the UK</h2>

                            <p style={{textAlign: 'justify'}}>
                                Looking for the next adventure in the UK? The UK is an easy place to explore its
                                beautiful diversity, thanks to its size you can be based in any city such as London or
                                Manchester and simply take a car to explore other areas.
                            </p>

                            <p class="impotant-box" style={{textAlign: 'justify'}}>
                                From the capital, you can drive 2hrs to reach the beautiful beaches of Brighton, or to
                                one of the country's most popular attractions, Stonehenge.
                            </p>
                            <p style={{textAlign: 'justify'}}>
                                Plan your sightseeing adventures with our list of the top 5 places to visit in the UK.
                            </p>
                        </div>
                        <div class="blog-right-grid mb-5" data-aos="fade-up">

                            <h2>1) London: The capital</h2>
                            <div class="blog-right-image">
                                <img src={blogImg7} alt="blog"/>
                            </div>
                            <p style={{textAlign: 'justify'}}>
                                London is a melting pot of culture and one of the top tourist destinations in the world,
                                with plenty of attractions to keep you busy. If you are interested in learning about the
                                UK's rich history, then you must visit the tower of London. Right beside the Tower
                                Bridge, a former palace and prison includes has fascinating medieval treasures, displays
                                of armour, and most of all it contains the home to the Crown Jewels, the Jewel house.
                            </p>
                            <p style={{textAlign: 'justify'}}>
                                If you are a fan of the Royal Family you will want to head to the Buckingham Palace, and
                                book a tour of the Palace's State Rooms, and don’t forget the iconic Big Ben and
                                Parliament Buildings, as you do not want to miss these when you are in London!
                            </p>
                        </div>
                        <div class="blog-right-grid mb-5" data-aos="fade-up">

                            <h2>2) Edinburgh</h2>
                            <div class="blog-right-image">
                                <img  src={blogImg1} alt="blog"/>
                            </div>
                            <p style={{textAlign: 'justify'}}>
                                The capital of Scotland, also one of the most visited cities in the. Well known for
                                their impressive historic buildings, and best known for their beautiful Edinburgh
                                Castle.
                            </p>
                            <p style={{textAlign: 'justify'}}>
                                From the castle, you can easily access other important historic sites within the city,
                                such as the Old Town's Royal Mile with its fine architecture, cafés, and art galleries.
                            </p>
                            <p style={{textAlign: 'justify'}}>
                                considering experiences such as work exchange programs would allow you more time to
                                immerse yourself in a new culture.
                            </p>
                        </div>
                        <div class="blog-right-grid mb-5" data-aos="fade-up">
                            <h2>3) Brighton</h2>
                            <div class="blog-right-image">
                                <img src={blogImg6} alt="blog"/>
                            </div>
                            <p style={{textAlign: 'justify'}}>
                                Brighton is not your typical British seaside resort, take a look below the surface and
                                you will find, great cuisines, vintage shops and many pubs. Come and explore the
                                Victorian history of this city and attractions such as the Brighton Palace Pier, dig in
                                to freshly prepared fish and chips, or enjoy nature at the white cliffs and woodlands of
                                the South Downs National Park. Enjoy everything the city has to offer from the wildlife
                                to the seaside.
                            </p>
                        </div>
                        <div class="blog-right-grid mb-5" data-aos="fade-up">
                            <h2>4) Stonehenge</h2>
                            <div class="blog-right-image">
                                <img src={blogImg8} alt="blog"/>
                            </div>
                            <p style={{textAlign: 'justify'}}>
                                One of the oldest sites on the planet, covering an area of more than 20 square
                                kilometres, Stonehenge has been a place of pilgrimage for more than 4,500 years. This
                                site has been believed to be an ancient place of worship, but now magnificent monument
                                attracting tourists all over the world. Make sure to plan ahead and purchase a ticket
                                before they run out!
                            </p>
                            <p style={{textAlign: 'justify'}}>
                                Also, with just 16-kilometre drive south of Stonehenge, you'll be able to visit one of
                                the country's most famous cathedrals, which dates back to 1220 and was the home to an
                                original Magna Carta.
                            </p>
                        </div>
                        <div class="blog-right-grid mb-5" data-aos="fade-up">
                            <h2>5) York</h2>
                            <div class="blog-right-image">
                                <img src={blogImg9} alt="blog"/>
                            </div>
                            <p style={{textAlign: 'justify'}}>
                                York remains one of the top destinations to travel to, and the reason for this is
                                because the city is known for having longest circuit of medieval city walls, which
                                stretches nearly three miles, offering stunning views of the city. The city is also
                                filled with many fun things to do and attractions such as the York Minster, which is the
                                largest medieval church in England. Visiting these sites should definitely be near the
                                top of your York travel itinerary
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- <div class="row">
                <div class="col-sm-5 col-md-4">
                    <div class="blog-left">
                        <div class="blog-left-common">
                            <h2>SEARCH</h2>
                            <div class="search-field">
                                <input type="search" placeholder="search...">
                                <svg viewBox="0 0 11 11">
                                    <g id="loupe" transform="translate(0 0)">
                                        <g id="Group_58" data-name="Group 58" transform="translate(0 0)">
                                            <g id="Group_57" data-name="Group 57">
                                                <path id="Path_48" data-name="Path 48"
                                                    d="M4.844,0A4.844,4.844,0,1,0,9.689,4.844,4.85,4.85,0,0,0,4.844,0Zm0,8.794a3.95,3.95,0,1,1,3.95-3.95A3.954,3.954,0,0,1,4.844,8.794Z" />
                                            </g>
                                        </g>
                                        <g id="Group_60" data-name="Group 60" transform="translate(7.542 7.542)">
                                            <g id="Group_59" data-name="Group 59">
                                                <path id="Path_49" data-name="Path 49"
                                                    d="M354.373,353.74l-2.564-2.564a.447.447,0,0,0-.632.632l2.564,2.564a.447.447,0,1,0,.632-.632Z"
                                                    transform="translate(-351.046 -351.046)" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div class="blog-left-common">
                            <h2>CATEGORIES</h2>
                            <ul class="category-list">
                                <li><a href="#">Cultural</a></li>
                                <li><a href="#">Lifestyle</a></li>
                                <li><a href="#">Nature & Adventure</a></li>
                                <li><a href="#">Festival & Events</a></li>
                                <li><a href="#">England</a></li>
                                <li><a href="#">Scotland</a></li>
                            </ul>
                        </div>
                        <div class="blog-left-common">
                            <h2>RECENT POSTS</h2>
                            <div class="recent-left-post d-flex mb-3">
                                <div class="recent-left-post-img">
                                    <img src="img/blog-img-1.jpg" alt="blog-image">
                                </div>
                                <div class="recent-left-post-content pl-3">
                                    <h2>Top 5 places to visit
                                        in the UK</h2>
                                    <p>April 24, 2018</p>
                                </div>
                            </div>
                            <div class="recent-left-post d-flex mb-3">
                                <div class="recent-left-post-img">
                                    <img src="img/blog-img-2.jpg" alt="blog-image">
                                </div>
                                <div class="recent-left-post-content pl-3">
                                    <h2>Top 5 places to visit
                                        in the UK</h2>
                                    <p>April 24, 2018</p>
                                </div>
                            </div>
                            <div class="recent-left-post d-flex mb-3">
                                <div class="recent-left-post-img">
                                    <img src="img/blog-img-2.jpg" alt="blog-image">
                                </div>
                                <div class="recent-left-post-content pl-3">
                                    <h2>Top 5 places to visit
                                        in the UK</h2>
                                    <p>April 24, 2018</p>
                                </div>
                            </div>
                        </div>
                        <div class="blog-left-common">
                            <h2>TAGS</h2>
                            <ul class="tag-list">
                                <li><a href="#">Lifestyle</a></li>
                                <li><a href="#">Man</a></li>
                                <li><a href="#">America</a></li>
                                <li><a href="#">UK</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-sm-7 col-md-8">
                   
                </div>
            </div> -->*/}
        </div>
    </section>
  );
}
