import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate(); 

 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim()) {
     
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg bg-dark ${isDarkMode ? 'bg-dark navbar-light' : 'bg-light navbar-dark'}`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" activeClassName="active">Home</NavLink>
        
      
       

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/business" activeClassName="active">Business</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/entertainment" activeClassName="active">Entertainment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/science" activeClassName="active">Science</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sports" activeClassName="active">Sports</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technology" activeClassName="active">Technology</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/health" activeClassName="active">Health</NavLink>
            </li>
          </ul>

       
       
          <form className="d-flex" onSubmit={handleSearchSubmit} role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};
