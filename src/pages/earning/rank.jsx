import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import SecurityImage from '../../assets/img/security.png';
import './rank-chart.css';
import useAuth from '../../hooks/useAuth';

export default function Rank() {
  const [activeTabOld, setActiveTab] = useState(1);

  const { user } = useAuth();

  const activeTab = user?.hostLevel || 1;

  return (
    <>
      <div className="earning-main host-ranking">
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="overview-header">
              <h2 className="m-0">Host Ranking</h2>
              <div className="select-outere">
                {/* <div className="banner-search-dropdowne dropdown">
                  <Label sx={{ fontSize: '14px', height: 25 }}> Months/Year </Label>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Nav tabs className="border-0 mb-4">
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 1 }) + ' pointer'} onClick={() => toggleTabs(1)}>
              <svg viewBox="0 0 1023.726 1321">
                <g id="Group_1" data-name="Group 1" transform="translate(-1941 465)">
                  <g id="_152531" data-name="152531" transform="translate(1941 814.881)">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M502.5-1279.4c-1.1.2-4.5.9-7.5,1.5-10.9,2-25.8,7.5-40,14.5-26.1,13-52,29.7-116.7,75.6-98.2,69.7-139.3,95.3-183.5,114.1-39.9,17.1-90.7,28.4-140,31.3-11.6.7-11.7.7-12.3,3.3C1.2-1032.9,0-988.1,0-946c0,73.3,1.6,114.8,8.5,226,5.2,82.1,7.2,106.8,10,120.7,9.9,49,44.9,135.9,80.3,199.3,30.6,54.9,82.8,129,127,180.4C288.1-147.2,375.1-64.2,439.5-15.7,448.3-9.1,457-3.1,458.8-2.3c1.8.7,106.7.7,124.1-.8l19.8-17.1c44.3-38,81.5-73.1,123.5-116.4C803.4-216.3,847.8-270,893.5-339c65.8-99.2,104.7-192.1,113.9-271.5,3.1-26.4,9.5-124.3,14.2-216,2.9-56.9,2.8-205.3-.1-212.7-1-2.6-6.8-3.8-18.3-3.8-34.8,0-85.8-11.6-130.2-29.7a588.876,588.876,0,0,1-67-33.4c-22.1-13.3-55.8-36.1-116-78.5-64.2-45.3-86.4-60.3-102.9-69.4-23.4-12.9-45.7-21.9-60.9-24.5C518.3-1279.9,507.2-1280.3,502.5-1279.4Z"
                    />
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M63,0l63,44L1.063,44.25Z"
                      transform="translate(584 41.119) rotate(180)"
                    />
                  </g>
                  <path
                    id="_Path_"
                    data-name="&lt;Path&gt;"
                    d="M318.19,296.32Q255.9,196,161.14,44.01c-.02-.01-.02-.02-.02-.03a85.821,85.821,0,1,0-149.85,83.7L220.8,466.22c.01.01.01.02.02.03,33.22,59.48,117.86,57.79,150.15,0,0-.01.01-.02.01-.03l95.2-153.81Q378.145,392.015,318.19,296.32ZM580.52,127.68a85.825,85.825,0,0,0-149.86-83.7.037.037,0,0,1-.01.03Q356.19,163.44,295.89,260.44c7.72,12.42,15.23,24.5,22.3,35.88q59.955,95.7,147.99,16.09Z"
                    transform="translate(2156.645 -59.992)"
                    fill="#fff"
                  />
                </g>
              </svg>{' '}
              Level 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 2 }) + ' pointer'} onClick={() => toggleTabs(2)}>
              <svg viewBox="0 0 1023.726 1321">
                <g id="Group_1" data-name="Group 1" transform="translate(-1941 465)">
                  <g id="_152531" data-name="152531" transform="translate(1941 814.881)">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M502.5-1279.4c-1.1.2-4.5.9-7.5,1.5-10.9,2-25.8,7.5-40,14.5-26.1,13-52,29.7-116.7,75.6-98.2,69.7-139.3,95.3-183.5,114.1-39.9,17.1-90.7,28.4-140,31.3-11.6.7-11.7.7-12.3,3.3C1.2-1032.9,0-988.1,0-946c0,73.3,1.6,114.8,8.5,226,5.2,82.1,7.2,106.8,10,120.7,9.9,49,44.9,135.9,80.3,199.3,30.6,54.9,82.8,129,127,180.4C288.1-147.2,375.1-64.2,439.5-15.7,448.3-9.1,457-3.1,458.8-2.3c1.8.7,106.7.7,124.1-.8l19.8-17.1c44.3-38,81.5-73.1,123.5-116.4C803.4-216.3,847.8-270,893.5-339c65.8-99.2,104.7-192.1,113.9-271.5,3.1-26.4,9.5-124.3,14.2-216,2.9-56.9,2.8-205.3-.1-212.7-1-2.6-6.8-3.8-18.3-3.8-34.8,0-85.8-11.6-130.2-29.7a588.876,588.876,0,0,1-67-33.4c-22.1-13.3-55.8-36.1-116-78.5-64.2-45.3-86.4-60.3-102.9-69.4-23.4-12.9-45.7-21.9-60.9-24.5C518.3-1279.9,507.2-1280.3,502.5-1279.4Z"
                    />
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M63,0l63,44L1.063,44.25Z"
                      transform="translate(584 41.119) rotate(180)"
                    />
                  </g>
                  <path
                    id="_Path_"
                    data-name="&lt;Path&gt;"
                    d="M318.19,296.32Q255.9,196,161.14,44.01c-.02-.01-.02-.02-.02-.03a85.821,85.821,0,1,0-149.85,83.7L220.8,466.22c.01.01.01.02.02.03,33.22,59.48,117.86,57.79,150.15,0,0-.01.01-.02.01-.03l95.2-153.81Q378.145,392.015,318.19,296.32ZM580.52,127.68a85.825,85.825,0,0,0-149.86-83.7.037.037,0,0,1-.01.03Q356.19,163.44,295.89,260.44c7.72,12.42,15.23,24.5,22.3,35.88q59.955,95.7,147.99,16.09Z"
                    transform="translate(2156.645 -59.992)"
                    fill="#fff"
                  />
                </g>
              </svg>{' '}
              Level 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 3 }) + ' pointer'} onClick={() => toggleTabs(3)}>
              <svg viewBox="0 0 1023.726 1321">
                <g id="Group_1" data-name="Group 1" transform="translate(-1941 465)">
                  <g id="_152531" data-name="152531" transform="translate(1941 814.881)">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M502.5-1279.4c-1.1.2-4.5.9-7.5,1.5-10.9,2-25.8,7.5-40,14.5-26.1,13-52,29.7-116.7,75.6-98.2,69.7-139.3,95.3-183.5,114.1-39.9,17.1-90.7,28.4-140,31.3-11.6.7-11.7.7-12.3,3.3C1.2-1032.9,0-988.1,0-946c0,73.3,1.6,114.8,8.5,226,5.2,82.1,7.2,106.8,10,120.7,9.9,49,44.9,135.9,80.3,199.3,30.6,54.9,82.8,129,127,180.4C288.1-147.2,375.1-64.2,439.5-15.7,448.3-9.1,457-3.1,458.8-2.3c1.8.7,106.7.7,124.1-.8l19.8-17.1c44.3-38,81.5-73.1,123.5-116.4C803.4-216.3,847.8-270,893.5-339c65.8-99.2,104.7-192.1,113.9-271.5,3.1-26.4,9.5-124.3,14.2-216,2.9-56.9,2.8-205.3-.1-212.7-1-2.6-6.8-3.8-18.3-3.8-34.8,0-85.8-11.6-130.2-29.7a588.876,588.876,0,0,1-67-33.4c-22.1-13.3-55.8-36.1-116-78.5-64.2-45.3-86.4-60.3-102.9-69.4-23.4-12.9-45.7-21.9-60.9-24.5C518.3-1279.9,507.2-1280.3,502.5-1279.4Z"
                    />
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M63,0l63,44L1.063,44.25Z"
                      transform="translate(584 41.119) rotate(180)"
                    />
                  </g>
                  <path
                    id="_Path_"
                    data-name="&lt;Path&gt;"
                    d="M318.19,296.32Q255.9,196,161.14,44.01c-.02-.01-.02-.02-.02-.03a85.821,85.821,0,1,0-149.85,83.7L220.8,466.22c.01.01.01.02.02.03,33.22,59.48,117.86,57.79,150.15,0,0-.01.01-.02.01-.03l95.2-153.81Q378.145,392.015,318.19,296.32ZM580.52,127.68a85.825,85.825,0,0,0-149.86-83.7.037.037,0,0,1-.01.03Q356.19,163.44,295.89,260.44c7.72,12.42,15.23,24.5,22.3,35.88q59.955,95.7,147.99,16.09Z"
                    transform="translate(2156.645 -59.992)"
                    fill="#fff"
                  />
                </g>
              </svg>{' '}
              Level 3
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 4 }) + ' pointer'} onClick={() => toggleTabs(4)}>
              <svg viewBox="0 0 1023.726 1321">
                <g id="Group_1" data-name="Group 1" transform="translate(-1941 465)">
                  <g id="_152531" data-name="152531" transform="translate(1941 814.881)">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M502.5-1279.4c-1.1.2-4.5.9-7.5,1.5-10.9,2-25.8,7.5-40,14.5-26.1,13-52,29.7-116.7,75.6-98.2,69.7-139.3,95.3-183.5,114.1-39.9,17.1-90.7,28.4-140,31.3-11.6.7-11.7.7-12.3,3.3C1.2-1032.9,0-988.1,0-946c0,73.3,1.6,114.8,8.5,226,5.2,82.1,7.2,106.8,10,120.7,9.9,49,44.9,135.9,80.3,199.3,30.6,54.9,82.8,129,127,180.4C288.1-147.2,375.1-64.2,439.5-15.7,448.3-9.1,457-3.1,458.8-2.3c1.8.7,106.7.7,124.1-.8l19.8-17.1c44.3-38,81.5-73.1,123.5-116.4C803.4-216.3,847.8-270,893.5-339c65.8-99.2,104.7-192.1,113.9-271.5,3.1-26.4,9.5-124.3,14.2-216,2.9-56.9,2.8-205.3-.1-212.7-1-2.6-6.8-3.8-18.3-3.8-34.8,0-85.8-11.6-130.2-29.7a588.876,588.876,0,0,1-67-33.4c-22.1-13.3-55.8-36.1-116-78.5-64.2-45.3-86.4-60.3-102.9-69.4-23.4-12.9-45.7-21.9-60.9-24.5C518.3-1279.9,507.2-1280.3,502.5-1279.4Z"
                    />
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M63,0l63,44L1.063,44.25Z"
                      transform="translate(584 41.119) rotate(180)"
                    />
                  </g>
                  <path
                    id="_Path_"
                    data-name="&lt;Path&gt;"
                    d="M318.19,296.32Q255.9,196,161.14,44.01c-.02-.01-.02-.02-.02-.03a85.821,85.821,0,1,0-149.85,83.7L220.8,466.22c.01.01.01.02.02.03,33.22,59.48,117.86,57.79,150.15,0,0-.01.01-.02.01-.03l95.2-153.81Q378.145,392.015,318.19,296.32ZM580.52,127.68a85.825,85.825,0,0,0-149.86-83.7.037.037,0,0,1-.01.03Q356.19,163.44,295.89,260.44c7.72,12.42,15.23,24.5,22.3,35.88q59.955,95.7,147.99,16.09Z"
                    transform="translate(2156.645 -59.992)"
                    fill="#fff"
                  />
                </g>
              </svg>{' '}
              Level 4
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 5 }) + ' pointer'} onClick={() => toggleTabs(5)}>
              <svg viewBox="0 0 1023.726 1321">
                <g id="Group_1" data-name="Group 1" transform="translate(-1941 465)">
                  <g id="_152531" data-name="152531" transform="translate(1941 814.881)">
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M502.5-1279.4c-1.1.2-4.5.9-7.5,1.5-10.9,2-25.8,7.5-40,14.5-26.1,13-52,29.7-116.7,75.6-98.2,69.7-139.3,95.3-183.5,114.1-39.9,17.1-90.7,28.4-140,31.3-11.6.7-11.7.7-12.3,3.3C1.2-1032.9,0-988.1,0-946c0,73.3,1.6,114.8,8.5,226,5.2,82.1,7.2,106.8,10,120.7,9.9,49,44.9,135.9,80.3,199.3,30.6,54.9,82.8,129,127,180.4C288.1-147.2,375.1-64.2,439.5-15.7,448.3-9.1,457-3.1,458.8-2.3c1.8.7,106.7.7,124.1-.8l19.8-17.1c44.3-38,81.5-73.1,123.5-116.4C803.4-216.3,847.8-270,893.5-339c65.8-99.2,104.7-192.1,113.9-271.5,3.1-26.4,9.5-124.3,14.2-216,2.9-56.9,2.8-205.3-.1-212.7-1-2.6-6.8-3.8-18.3-3.8-34.8,0-85.8-11.6-130.2-29.7a588.876,588.876,0,0,1-67-33.4c-22.1-13.3-55.8-36.1-116-78.5-64.2-45.3-86.4-60.3-102.9-69.4-23.4-12.9-45.7-21.9-60.9-24.5C518.3-1279.9,507.2-1280.3,502.5-1279.4Z"
                    />
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M63,0l63,44L1.063,44.25Z"
                      transform="translate(584 41.119) rotate(180)"
                    />
                  </g>
                  <path
                    id="_Path_"
                    data-name="&lt;Path&gt;"
                    d="M318.19,296.32Q255.9,196,161.14,44.01c-.02-.01-.02-.02-.02-.03a85.821,85.821,0,1,0-149.85,83.7L220.8,466.22c.01.01.01.02.02.03,33.22,59.48,117.86,57.79,150.15,0,0-.01.01-.02.01-.03l95.2-153.81Q378.145,392.015,318.19,296.32ZM580.52,127.68a85.825,85.825,0,0,0-149.86-83.7.037.037,0,0,1-.01.03Q356.19,163.44,295.89,260.44c7.72,12.42,15.23,24.5,22.3,35.88q59.955,95.7,147.99,16.09Z"
                    transform="translate(2156.645 -59.992)"
                    fill="#fff"
                  />
                </g>
              </svg>{' '}
              Level 5
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="w-100 padding-left-zero" activeTab={activeTab}>
          <div className="host-raddinghead mb-4">
            <h2>Bookings</h2>
          </div>
          <div className="rank-arrow">
            <div
              class="arrow-tail"
              style={{
                marginLeft: `${+activeTab * 25 - 25}%`
              }}
            ></div>
            <div
              className="arrow-bottom"
              style={{
                marginLeft: `${+activeTab * 25 - 25}%`
              }}
            ></div>
          </div>
          <div className="rank-numbers">
            <div>0</div>
            <div>{'>'} 25</div>
            <div>{'>'} 50</div>
            <div>{'>'} 75</div>
            <div>{'>'} 100</div>
          </div>
          <div className="rank-container">
            <div className="centerline"></div>
            <div className="verticleLineContainer">
              <div className="verticalLine"></div>

              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>

              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>

              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>

              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>

              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>

              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>
              <div className="verticalSmallLine"></div>

              <div className="verticalLine"></div>
            </div>
          </div>
          <TabPane tabId={1}>
            {/* <img src={LineGraphLevelOne} alt="graph" className="mb-4 w-100 light-graph" /> */}
            {/* <img src={DarkLineGraphLevelOne} alt="graph" className="mb-4 h-100 w-100 dark-graph" /> */}

            <div className="ranking-percentage mb-4 d-flex flex-wrap align-items-center">
              <div className="ranking-percent-grid text-center level-5">
                <h2>
                  0%<span className="ranking-off">off</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  1%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  2%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  3%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  5%<span className="ranking-off">off fees</span>
                </h2>
              </div>
            </div>
            <div className="rank-box">
              <div className="ranking-paragraph">
                <p className="logo-left-side-content">
                  <img className="logo-side" src={SecurityImage} alt="Test Image" />
                  <h2>What is the ranking system about?</h2>
                  When a host first signs up with Vumah they start off as a level 0 Host. There are 5 levels, each
                  dependent on the amount of booking days the host manages to reach within the month with each level
                  having its own perks/rewards!
                </p>
                <p>
                  Once moving up a level, you have the following month to keep up with your bookings, if the numbers are
                  not kept up with the required numbers for that level within that month you will drop down a level, but
                  you are able to move up multiple levels at any time within the month.
                </p>
              </div>
              <div className="ranking-paragraph second">
                <h2>Tips to stand out and get more bookings:</h2>
                <ul className="padding-left-zero">
                  <li>Great pictures: Presentation is important and would encourage more users to your listings.</li>
                  <li>
                    Great experiences: Make sure you are responsive, on time and provide the best experience for your
                    guests so they will leave good reviews, making you stand out from other hosts.
                  </li>
                </ul>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={2}>
            {/* <img src={LineGraphLevelTwo} alt="graph" className="mb-4 w-100 light-graph" />
            <img src={DarkLineGraphLevelTwo} alt="graph" className="mb-4 w-100 h-100 dark-graph" /> */}

            <div className="ranking-percentage mb-4 d-flex flex-wrap align-items-center">
              <div className="ranking-percent-grid text-center">
                <h2>
                  0%<span className="ranking-off">off</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center level-2">
                <h2>
                  1%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  2%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  3%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  5%<span className="ranking-off">off fees</span>
                </h2>
              </div>
            </div>
            <div className="rank-box">
              <div className="ranking-paragraph">
                <p className="logo-left-side-content">
                  <img className="logo-side" src={SecurityImage} alt="Test Image" />
                  <h2>What is the ranking system about?</h2>
                  When a host first signs up with Vumah they start off as a level 0 Host. There are 5 levels, each
                  dependent on the amount of booking days the host manages to reach within the month with each level
                  having its own perks/rewards!
                </p>
                <p>
                  Once moving up a level, you have the following month to keep up with your bookings, if the numbers are
                  not kept up with the required numbers for that level within that month you will drop down a level, but
                  you are able to move up multiple levels at any time within the month.
                </p>
              </div>
              <div className="ranking-paragraph second">
                <h2>Tips to stand out and get more bookings:</h2>
                <ul className="padding-left-zero">
                  <li>Great pictures: Presentation is important and would encourage more users to your listings.</li>
                  <li>
                    Great experiences: Make sure you are responsive, on time and provide the best experience for your
                    guests so they will leave good reviews, making you stand out from other hosts.
                  </li>
                </ul>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={3}>
            {/* <div className="host-raddinghead mb-4">
              <h2>Bookings</h2>
            </div> */}
            {/* <img src={LineGraphLevelThree} alt="graph" className="mb-4 w-100 light-graph" />
            <img src={DarkLineGraphLevelThree} alt="graph" className="mb-4 h-100 w-100 dark-graph" /> */}
            <div className="ranking-percentage mb-4 d-flex flex-wrap align-items-center">
              <div className="ranking-percent-grid text-center">
                <h2>
                  0%<span className="ranking-off">off</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  1%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center level-3">
                <h2>
                  2%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  3%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  5%<span className="ranking-off">off fees</span>
                </h2>
              </div>
            </div>
            <div className="rank-box">
              <div className="ranking-paragraph">
                <p className="logo-left-side-content">
                  <img className="logo-side" src={SecurityImage} alt="Test Image" />
                  <h2>What is the ranking system about?</h2>
                  When a host first signs up with Vumah they start off as a level 0 Host. There are 5 levels, each
                  dependent on the amount of booking days the host manages to reach within the month with each level
                  having its own perks/rewards!
                </p>
                <p>
                  Once moving up a level, you have the following month to keep up with your bookings, if the numbers are
                  not kept up with the required numbers for that level within that month you will drop down a level, but
                  you are able to move up multiple levels at any time within the month.
                </p>
              </div>
              <div className="ranking-paragraph second">
                <h2>Tips to stand out and get more bookings:</h2>
                <ul className="padding-left-zero">
                  <li>Great pictures: Presentation is important and would encourage more users to your listings.</li>
                  <li>
                    Great experiences: Make sure you are responsive, on time and provide the best experience for your
                    guests so they will leave good reviews, making you stand out from other hosts.
                  </li>
                </ul>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={4}>
            {/* <div className="host-raddinghead mb-4">
              <h2>Bookings</h2>
            </div> */}
            {/* <img src={LineGraphLevelFour} alt="graph" className="mb-4 w-100 h-full light-graph" />
            <img src={DarkLineGraphLevelFour} alt="graph" className="mb-4 h-100 w-100 dark-graph" /> */}
            <div className="ranking-percentage mb-4 d-flex flex-wrap align-items-center">
              <div className="ranking-percent-grid text-center">
                <h2>
                  0%<span className="ranking-off">off</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  1%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center ">
                <h2>
                  2%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center level-4">
                <h2>
                  3%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  5%<span className="ranking-off">off fees</span>
                </h2>
              </div>
            </div>
            <div className="rank-box">
              <div className="ranking-paragraph">
                <p className="logo-left-side-content">
                  <img className="logo-side" src={SecurityImage} alt="Test Image" />
                  <h2>What is the ranking system about?</h2>
                  When a host first signs up with Vumah they start off as a level 0 Host. There are 5 levels, each
                  dependent on the amount of booking days the host manages to reach within the month with each level
                  having its own perks/rewards!
                </p>
                <p>
                  Once moving up a level, you have the following month to keep up with your bookings, if the numbers are
                  not kept up with the required numbers for that level within that month you will drop down a level, but
                  you are able to move up multiple levels at any time within the month.
                </p>
              </div>
              <div className="ranking-paragraph second">
                <h2>Tips to stand out and get more bookings:</h2>
                <ul className="padding-left-zero">
                  <li>Great pictures: Presentation is important and would encourage more users to your listings.</li>
                  <li>
                    Great experiences: Make sure you are responsive, on time and provide the best experience for your
                    guests so they will leave good reviews, making you stand out from other hosts.
                  </li>
                </ul>
              </div>
            </div>
          </TabPane>
          <TabPane tabId={5}>
            {/* <div className="host-raddinghead mb-4">
              <h2>Bookings</h2>
            </div> */}
            {/* <img src={LineGraphLevelFive} alt="graph" className="mb-4 w-100 h-full light-graph" />
            <img src={DarkLineGraphLevelFive} alt="graph" className="mb-4 h-100 w-100 dark-graph" /> */}
            <div className="ranking-percentage mb-4 d-flex flex-wrap align-items-center">
              <div className="ranking-percent-grid text-center">
                <h2>
                  0%<span className="ranking-off">off</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  1%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center">
                <h2>
                  2%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center ">
                <h2>
                  3%<span className="ranking-off">off fees</span>
                </h2>
              </div>
              <div className="ranking-percent-grid text-center level-5">
                <h2>
                  5%<span className="ranking-off">off fees</span>
                </h2>
              </div>
            </div>
            <div className="rank-box">
              <div className="ranking-paragraph">
                <p className="logo-left-side-content">
                  <img className="logo-side" src={SecurityImage} alt="Test Image" />
                  <h2>What is the ranking system about?</h2>
                  When a host first signs up with Vumah they start off as a level 0 Host. There are 5 levels, each
                  dependent on the amount of booking days the host manages to reach within the month with each level
                  having its own perks/rewards!
                </p>
                <p>
                  Once moving up a level, you have the following month to keep up with your bookings, if the numbers are
                  not kept up with the required numbers for that level within that month you will drop down a level, but
                  you are able to move up multiple levels at any time within the month.
                </p>
              </div>
              <div className="ranking-paragraph second">
                <h2>Tips to stand out and get more bookings:</h2>
                <ul className="padding-left-zero" style={{ textAlign: 'justify' }}>
                  <li style={{ textAlign: 'justify' }}>
                    Great pictures: Presentation is important and would encourage more users to your listings.
                  </li>
                  <li style={{ textAlign: 'justify' }}>
                    Great experiences: Make sure you are responsive, on time and provide the best experience for your
                    guests so they will leave good reviews, making you stand out from other hosts.
                  </li>
                </ul>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </>
  );

  function toggleTabs(tab) {
    if (activeTab !== tab) setActiveTab(tab);
  }
}
