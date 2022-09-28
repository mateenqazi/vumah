import React from 'react';
import blogBanner from '../../../assets/img/blog-banner.png';
import blogimg1 from '../../../assets/img/blog1.png';
import blogimg2 from '../../../assets/img/blog2.png';
import blogimg3 from '../../../assets/img/blog3.png';
import blogimg4 from '../../../assets/img/blog4.png';

export default function Blog1() {
  return (
    <>
    <section className='new-blog'> 
        <div className='featured-img'>
        <img src={blogBanner} />
        <h2>Why <span> Travel Is Important </span> Today More <span> Than Ever </span></h2>
        </div>
        <div className='overlay'></div>
    </section>

    <section className='inner-blog'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='descrip'>
                        <p> Traveling is a very important part of life as it is the best way to get out of the busy work life and a good remedy for stress, anxiety and depression. Improving mental and physical health. Not only does travelling provide the opportunity to experience the beauty of nature </p>
                        <span>Exploring new places has its advantages, as it allows us to forget our worries, problems, frustrations and fears. This allows us to broaden our horizon and move in new directions, unplugging from the struggles of life and enjoying what the world has to offer, therefore fill your passport full of stamps and create some amazing memories!</span>
                    </div>
                    <div className='title-blog'>
                        <h3>These are the top 4 reasons why travelling is so important:</h3>
                    </div>
                </div>
            </div>
            <div className='left-right-sec'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='blog-img'>
                            <img src={blogimg1} />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='blog-text'>
                        <h3><span>1)</span> Exploring new cuisines</h3>
                        <hr class="line" />
                        <p>Traveling provides the perfect opportunity to try new, great and authentic 
                        cuisines from different regions of the world. Bringing you unique flavours which 
                        never have experienced before! Don’t forget that travelling is never complete 
                        without trying the local food, as you can never truly experience the culture 
                        without at least trying what the locals eat. We all enjoy traveling, escaping our 
                        comfort zone, meeting new people and creating unforgettable memories. Yet, the best 
                        part of all is the food. Experiencing a wide range of authentic flavours would not be 
                        possible without visiting these different corners of the world.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='left-right-sec second'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='blog-text'>
                        <h3><span>2)</span>  New Cultures</h3>
                        <hr class="line" />
                        <p>Cultures are the characteristics formed by a society through their language, family values, geography and history. Exploring a different culture enriches the mind and soul, as It reinforces a whole experience and provides new perspective. Facing culture shock and having the chance to learn new skills and more about yourself.</p>
<p> 
Often the best way to experience a new culture is by spending some considerable time there. While a short visit may only give you a glimpse,
</p>
<p>
considering experiences such as work exchange programs would allow you more time to immerse yourself in a new culture</p>
                        </div>
                    </div>
                     <div className='col-md-6'>
                        <div className='blog-img'>
                            <img src={blogimg2} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='left-right-sec third'>
                <div className='row'>
                    <div className='col-md-6 type'>
                        <div className='blog-img'>
                            <img src={blogimg3} />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='blog-text'>
                        <h3><span>3)</span> Self development</h3>
                        <hr class="line" />
                        <p>Traveling has also become known to be one of the best ways to enhance personal growth. It allows you to escape from your daily routines and step out your comfort zone as you move to a different environment, which gives a sense of independence. Each journey can bring out something out of you and help you find your strengths and weaknesses, learning more about yourself, people and new environments. This is because, traveling sometimes brings challenges and opportunities in such ways that can make you a stronger individua, progressing to a new and better version of yourself. Reinvent yourself and discover who you really are.</p>
                        </div>
                    </div>

                </div>
            </div>  
            <div className='left-right-sec last'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='blog-text'>
                        <h3><span>4)</span> Meeting new people</h3>
                        <hr class="line" />
                        <p>You can build new friendships and connections with people from different places around the world. Building networks and establishing connections is also one of the biggest benefits of travelling, as it expands your reach which can be a huge advantage in your own personal life. You may meet some people for only a short while but moments like these can be life changing, opening new doors, creating new perspectives and perhaps you will even start learning a new language!</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='blog-img'>
                            <img src={blogimg4} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    </>
  );
}
