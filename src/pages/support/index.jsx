import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Link as RLink } from 'react-router-dom';
import Button from 'src/theme/overrides/Button';
import useAuth from '../../hooks/useAuth';
import { Typography } from '@mui/material';

function Link(props) {
  function scrollToHash(runMore) {
    if (props.to && props.to.includes('#')) {
      const id = props.to.split('#');
      if (id.length > 1) {
        const el = document.getElementById(id[1]);

        if (el) {
          el.scrollIntoView();
        }
      }
    }

    if (runMore !== false) {
      setTimeout(() => {
        scrollToHash(false);
      }, 50);

      setTimeout(() => {
        scrollToHash(false);
      }, 100);

      setTimeout(() => {
        scrollToHash(false);
      }, 150);

      setTimeout(() => {
        scrollToHash(false);
      }, 200);
    }
  }

  return <RLink onClick={scrollToHash} {...props} />;
}

export default function Support() {
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState('1');
  const [articles, setArticles] = useState([]);
  const [sortedArticles, setSortedArticles] = useState([]);
  const [searchText, setSearchText] = useState("");


  const toggle = (tab) => {
    location.hash = tab;
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (location.hash === '#1') {
    toggle('1');
  } else if (location.hash === '#2') {
    toggle('2');

  } else if (location.hash === '#3') {
    toggle('3');

  }
  const fetchArticles = async () => {
    const articlesData = [{ type: 1, header: "Getting Started with Vumah", content: "" },
    { type: 1, header: "Trouble with your booking", content: "" },
    { type: 1, header: "Guest Fees", content: "" },
    { type: 1, header: "Breakdown", content: "" },
    { type: 1, header: "Keeping your account safe", content: "" },
    { type: 2, header: "Would Vumah handle my charges if my vehicle has not been returned in the right state?", content: "" },
    { type: 2, header: "Creating a listing and how to stand out", content: "" },
    { type: 2, header: "Host rankings and performance standards", content: "" },
    { type: 2, header: "Overview of fees, credits, and bills", content: "" },
    { type: 2, header: "Report an issue with a renter", content: "" },
    { type: 2, header: "What happens if my guest returns the vehicle late?", content: "" },
    { type: 2, header: "How do I cancel a booking?", content: "" },
    { type: 2, header: "Does Vumah charge hosts with VAT and Sales Tax?", content: "" },
    { type: 2, header: "How payments work,How do I request to remove a review?", content: "" },
    { type: 3, header: "Resetting your password", content: "" },
    { type: 3, header: "Change your contact information", content: "" },
    { type: 3, header: "Keeping your account safe", content: "" },
    { type: 3, header: "Account suspensions and restrictions", content: "" },
    ];
    setArticles(articlesData)
    setSortedArticles(articlesData)
  }
  const onSearch = (e) => {
    const val = e.target.value;
    const filteredArticles = articles.filter(x => {
      const words = x.header.split(" ");
      const searchWords = val.split(" ");
      for (const word of words) {
        for (const searchWord of searchWords) {
          if (word.toLowerCase().includes(searchWord.toLowerCase())) {
            return true;
          }
        }
      }

      return false

    })
    setSortedArticles(filteredArticles)
    setSearchText(val);
  }
  useEffect(() => {
    setTimeout(() => {
      if (location.hash === '#1') {
        toggle('1');
      } else if (location.hash === '#2') {
        toggle('2');
      } else if (location.hash === '#3') {
        toggle('3');
      }
    }, 100);

  });
  useEffect(() => {
    setSearchText("");
    fetchArticles();
  }, [activeTab])

  return (
    <section className="support-main padd-top-60 padd-bottom-60">
      <div className="container">
        <div className="support-search-main text-center mb-5">
          <h2>What do you need help with?</h2>
          <div className="d-flex">
            <div className="support-search-field">
              <input value={searchText} onChange={onSearch} type="search" placeholder="Keywords..." />
              <i className="fas fa-search"></i>
            </div>
            <div className="support-search-btn text-center">Search</div>
          </div>
        </div>
        <div className="support-tab-main">
          <div className="support-tabs d-flex justify-content-center mb-5">
            <Nav tabs className="border-0">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  Guest
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Hosts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => {
                    toggle('3');
                  }}
                >
                  Account Management
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div class="row">
                <div class="col-md-12">
                  <div class="service-header mb-4">
                    <h2>Articles</h2>
                  </div>
                </div>
                {sortedArticles.filter(x => x.type === 1).map(article1 => (
                  <div key={article1.header} class="col-md-3 mb-4">
                    <div class="more-topic-grid">
                      <Link to="/guest-guide#getting-started-with-vumah">
                        <h4 className="link-text-support">{article1.header}</h4>
                      </Link>
                    </div>
                  </div>
                ))}

              </div>
            </TabPane>
            <TabPane tabId="2">
              <div class="row">
                <div class="col-md-12">
                  <div class="service-header mb-4">
                    <h2>Articles</h2>
                  </div>
                </div>
                {sortedArticles.filter(x => x.type === 2).map(article2 => (
                  (<div key={article2.header} class="col-md-3 mb-4">
                    <div class="more-topic-grid">
                      <Link to="/host-guide#vehicle-not-returned-in-right-state">
                        <h4 className="link-text-support">
                          {article2.header}
                        </h4>
                      </Link>
                    </div>
                  </div>)
                ))}

              </div>
            </TabPane>
            <TabPane tabId="3">
              <div class="row">
                <div class="col-md-12">
                  <div class="service-header mb-4">
                    <h2 className="link-text-support">Articles</h2>
                  </div>
                </div>
                {sortedArticles.filter(x => x.type === 3).map(article3 => (
                  <div key={article3.header} class="col-md-3 mb-4">
                    <div class="more-topic-grid">
                      <Link to="/host-guide#vehicle-not-returned-in-right-state">
                        <h4 className="link-text-support">
                          {article3.header}
                        </h4>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabPane>
          </TabContent>
        </div>
        {isAuthenticated && (
          <div style={{ display: 'flex' }}>
            <a
              style={{ marginLeft: 'auto' }}
              href="../contact-us"
              align="right"
              className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButtonBase-root  css-1kw71qe-MuiButtonBase-root-MuiButton-root"
            >
              Contact Us
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
