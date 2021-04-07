const Navbar = (props) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item subtitle is-3" href={"/"}>
          NETERO
        </a>
      </div>
      <div id="navbarMenu" className="navbar-menu">
        <div className="navbar-start" >
            <span className="navbar-item">毎日、感謝の正拳突きを</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
