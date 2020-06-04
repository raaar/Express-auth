import React from 'react';

const Nav = () => {

  const picture = window?.DATA?.user?.picture;
  const name = window?.DATA?.user?.name;


  return <nav>
    { picture &&  <img src={picture}></img> }

    <h1>{name}</h1>
  </nav>
}

export default Nav;