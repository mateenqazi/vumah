import React, { useEffect } from 'react';

function RedirectComp({ link }) {
  useEffect(() => {
    window.location.href = link;
  }, []);
  return <div></div>;
}

export default RedirectComp;
