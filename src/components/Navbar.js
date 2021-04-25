const Navbar = (props) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item title is-3" href={"/"}>
          NETERO
        </a>
        <div className="navbar-item subtitle is-6 japanese">毎日、感謝の正拳突きを</div>
      </div>
    </nav>
  );
};

export default Navbar;
