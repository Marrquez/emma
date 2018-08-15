import React, { Component } from 'react';
import './Header.css';

class LoginForm extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            pswd: ''
        };
    }
    logInUser(e){
        e.preventDefault();
        this.props.logInUser({email:this.state.email, pswd:this.state.pswd});
    }
    recoverPswd(e){
        e.preventDefault();
        this.props.recoverPswd();
    }
    setEmail(e){
        this.setState({email:e.target.value});
    }
    setPswd(e){
        this.setState({pswd:e.target.value});
    }
    render(){
        return <form className="form-inline" onSubmit={this.logInUser.bind(this)} id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email"
                       className="textbox"
                       id="exampleInputEmail2"
                       placeholder="Email address"
                       required
                       value={this.state.email}
                       onChange={this.setEmail.bind(this)}
                />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password"
                       className="textbox"
                       id="exampleInputPassword2"
                       placeholder="Password"
                       required
                       value={this.state.pswd}
                       onChange={this.setPswd.bind(this)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-small btn-primary btn-block">Sign in</button>
                <span className="lbl-absolute" onClick={this.recoverPswd.bind(this)}>Recordar contraseña ?</span>
            </div>
        </form>;
    }
}

class RecoverForm extends Component {
    constructor(props) {
        super();
        this.state = {
            email: ''
        };
    }
    recoverPswd(e){
        e.preventDefault();
        this.props.recoverByEmail(this.state.email);
    }
    setEmail(e){
        this.setState({email:e.target.value});
    }
    render(){
        return <form className="form" onSubmit={this.recoverPswd.bind(this)} id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail2"
                       placeholder="Email address"
                       required
                       value={this.state.email}
                       onChange={this.setEmail.bind(this)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Recover password</button>
            </div>
        </form>;
    }
}

class RegisterForm extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            pswd: ''
        };
    }
    signInUser(e){
        e.preventDefault();
        this.props.signInUser({email:this.state.email, pswd:this.state.pswd});
    }
    setEmail(e){
        this.setState({email:e.target.value});
    }
    setPswd(e){
        this.setState({pswd:e.target.value});
    }
    render(){
        return <form className="form" onSubmit={this.signInUser.bind(this)} id="login-nav">
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail2"
                       placeholder="Email address"
                       required
                       value={this.state.email}
                       onChange={this.setEmail.bind(this)}
                />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password"
                       className="form-control"
                       id="exampleInputPassword2"
                       placeholder="Password"
                       required
                       value={this.state.pswd}
                       onChange={this.setPswd.bind(this)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
        </form>;
    }
}

class Header extends Component {
    constructor(props) {
        super();
        this.state = {
            view: 'empty'
        }
    }
    componentDidMount(){ }
    componentWillMount(){ }
    componentWillUnmount() { }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
    logInUser(){
        if(this.state.view === 'login'){
            this.setState({view: 'empty'});
        }else {
            this.setState({view: 'login'});
        }
    }
  render() {
      var currentForm = null;

      if(this.state.view === 'login'){
          currentForm = <LoginForm></LoginForm>;
      }else if(this.state.view === 'empty'){
          currentForm = null;
      }

      return (
          <header className="Header">
              <div className="navbar">
                  <div className="navbar-header">
                      <div className="container">
                          <ul className="info pull-left">
                              <li><a href=""><i className="icon-mail-1 contact"></i> info@reen.com</a></li>
                              <li><i className="icon-mobile contact"></i> +00 (123) 456 78 90</li>
                          </ul>
                          <ul className="social pull-right">
                              <li onClick={this.logInUser.bind(this)}><a><i className="icon-user"></i></a></li>
                              <li><a href=""><i className="icon-s-facebook"></i></a></li>
                              <li><a href=""><i className="icon-s-youtube"></i></a></li>
                              <li><a href=""><i className="icon-s-twitter"></i></a></li>
                              <li><a href=""><i className="icon-s-instagram"></i></a></li>
                          </ul>
                          <ul className="dynamic-form pull-right">{currentForm}</ul>
                          <a className="navbar-brand" href="index.html"><img src="assets/images/logo.svg" className="logo" alt="" /></a>
                          <a className="navbar-toggle btn responsive-menu pull-right" data-toggle="collapse" data-target=".navbar-collapse"><i className='icon-menu-1'></i></a>
                      </div>
                  </div>
                  <div className="yamm">
                      <div className="navbar-collapse collapse">
                          <div className="container">
                              <a className="navbar-brand" href="index.html"><img src="assets/images/logo.svg" className="logo" alt="" /></a>
                              <ul className="nav navbar-nav">
                                  <li className="dropdown">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Home</a>
                                      <ul className="dropdown-menu">
                                          <li><a href="index.html">Product Style</a></li>
                                          <li><a href="index2.html">Service Style</a></li>
                                          <li><a href="index3.html">Agency Style</a></li>
                                          <li><a href="index4.html">Portfolio Style</a></li>
                                          <li><a href="index5.html">Showcase Style</a></li>
                                      </ul>
                                  </li>
                                  <li className="dropdown">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Portfolio</a>
                                      <ul className="dropdown-menu">
                                          <li><a href="portfolio.html">3 Columns Grid</a></li>
                                          <li><a href="portfolio2.html">3 Columns Details Grid</a></li>
                                          <li><a href="portfolio3.html">4 Columns Grid</a></li>
                                          <li><a href="portfolio4.html">4 Columns Details Grid</a></li>
                                          <li><a href="portfolio5.html">Fullscreen Grid</a></li>
                                          <li><a href="portfolio-post.html">Post with Slider I</a></li>
                                          <li><a href="portfolio-post2.html">Post with Slider II</a></li>
                                          <li><a href="portfolio-post3.html">Post with Images I</a></li>
                                          <li><a href="portfolio-post4.html">Post with Images II</a></li>
                                          <li><a href="portfolio-post5.html">Post with Video</a></li>
                                          <li><a href="portfolio-post6.html">Post with Audio</a></li>
                                      </ul>
                                  </li>
                                  <li className="dropdown">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Blog</a>
                                      <ul className="dropdown-menu">
                                          <li><a href="blog.html">Sidebar right</a></li>
                                          <li><a href="blog2.html">Sidebar left</a></li>
                                          <li><a href="blog3.html">Without Sidebar</a></li>
                                          <li><a href="blog4.html">2 Columns Grid Sidebar right</a></li>
                                          <li><a href="blog5.html">2 Columns Grid Sidebar left</a></li>
                                          <li><a href="blog6.html">2 Columns Grid without Sidebar</a></li>
                                          <li><a href="blog7.html">3 Columns Grid without Sidebar</a></li>
                                          <li><a href="blog-post.html">Post Sidebar right</a></li>
                                          <li><a href="blog-post2.html">Post Sidebar left</a></li>
                                          <li><a href="blog-post3.html">Post without Sidebar</a></li>
                                      </ul>
                                  </li>
                                  <li className="dropdown">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Pages</a>
                                      <ul className="dropdown-menu">
                                          <li className="dropdown-submenu">
                                              <a href="" className="dropdown-toggle" data-toggle="dropdown">One Page</a>
                                              <ul className="dropdown-menu">
                                                  <li><a href="one-page1.html">Product Style</a></li>
                                                  <li><a href="one-page2.html">Service Style</a></li>
                                                  <li><a href="one-page3.html">Agency Style</a></li>
                                                  <li><a href="one-page4.html">Portfolio Style</a></li>
                                                  <li><a href="one-page5.html">Showcase Style</a></li>
                                              </ul>
                                          </li>
                                          <li><a href="about.html">About I</a></li>
                                          <li><a href="about2.html">About II</a></li>
                                          <li><a href="services.html">Services I</a></li>
                                          <li><a href="services2.html">Services II</a></li>
                                          <li><a href="services3.html">Services III</a></li>
                                          <li><a href="pricing.html">Pricing I</a></li>
                                          <li><a href="pricing2.html">Pricing II</a></li>
                                          <li><a href="sidenav.html">Side Navigation</a></li>
                                      </ul>
                                  </li>
                                  <li className="dropdown">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Features</a>
                                      <ul className="dropdown-menu">
                                          <li><a href="slider-carousel.html">Slider/Carousel</a></li>
                                          <li><a href="modal.html">Modal</a></li>
                                          <li><a href="tab.html">Tab</a></li>
                                          <li><a href="accordion.html">Accordion</a></li>
                                          <li><a href="isotope.html">Isotope</a></li>
                                          <li><a href="styles.html">Styles</a></li>
                                          <li><a href="font-icons.html">Font Icons</a></li>
                                          <li><a href="backgrounds.html">Backgrounds</a></li>
                                          <li className="dropdown-submenu">
                                              <a href="" className="dropdown-toggle" data-toggle="dropdown">Colors</a>
                                              <ul className="dropdown-menu">
                                                  <li><a className="changecolor green" title="Green color">Green</a></li>
                                                  <li><a className="changecolor blue" title="Blue color">Blue</a></li>
                                                  <li><a className="changecolor red" title="Red color">Red</a></li>
                                                  <li><a className="changecolor pink" title="Pink color">Pink</a></li>
                                                  <li><a className="changecolor purple" title="Purple color">Purple</a></li>
                                                  <li><a className="changecolor orange" title="Orange color">Orange</a></li>
                                                  <li><a className="changecolor navy" title="Navy color">Navy</a></li>
                                                  <li><a className="changecolor gray" title="Gray color">Gray</a></li>
                                              </ul>
                                          </li>
                                          <li className="dropdown-submenu">
                                              <a href="" className="dropdown-toggle" data-toggle="dropdown">Submenu Levels</a>
                                              <ul className="dropdown-menu">
                                                  <li><a href="">Second Level</a></li>
                                                  <li><a href="">Second Level</a></li>
                                                  <li className="dropdown-submenu">
                                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">More</a>
                                                      <ul className="dropdown-menu">
                                                          <li><a href="">Third Level</a></li>
                                                          <li><a href="">Third Level</a></li>
                                                      </ul>
                                                  </li>
                                              </ul>
                                          </li>
                                      </ul>
                                  </li>
                                  <li className="dropdown yamm-fullwidth">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Mega Menu</a>
                                      <ul className="dropdown-menu yamm-dropdown-menu">
                                          <li>
                                              <div className="yamm-content row">
                                                  <div className="col-sm-3 inner">
                                                      <h4>Focus on</h4>
                                                      <figure>
                                                          <div className="icon-overlay icn-link">
                                                              <a href="portfolio-post.html"><img src="assets/images/art/work01.jpg" alt="" /></a>
                                                          </div>
                                                          <figcaption>
                                                              <p>Consed quodips ameniat empernam que apid cust quas molor eatis numa estio.</p>
                                                              <a href="portfolio-post.html" className="btn">View Project</a>
                                                          </figcaption>
                                                      </figure>
                                                  </div>
                                                  <div className="col-sm-3 inner">
                                                      <h4>Special Pages</h4>
                                                      <ul className="circled">
                                                          <li><a href="portfolio2.html">3 Columns Details Grid Portfolio</a></li>
                                                          <li><a href="portfolio5.html">Fullscreen Grid Portfolio</a></li>
                                                          <li><a href="portfolio-post5.html">Portfolio Post with Video</a></li>
                                                          <li><a href="blog5.html">2 Columns Grid Blog with Left Sidebar</a></li>
                                                          <li><a href="blog7.html">3 Columns Grid Blog without Sidebar</a></li>
                                                          <li><a href="blog-post.html">Blog Post with Right Sidebar</a></li>
                                                          <li><a href="sidenav.html">Side Navigation Page</a></li>
                                                          <li><a href="about2.html">About Page II</a></li>
                                                          <li><a href="services.html">Service Page I</a></li>
                                                          <li><a href="pricing.html">Pricing Page I</a></li>
                                                          <li><a href="contact.html">Contact Page I</a></li>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-3 inner">
                                                      <h4>Latest Works</h4>
                                                      <div className="row thumbs gap-xs">
                                                          <div className="col-xs-6 thumb">
                                                              <figure className="icon-overlay icn-link">
                                                                  <a href="portfolio-post.html"><img src="assets/images/art/work02.jpg" alt="" /></a>
                                                              </figure>
                                                          </div>
                                                          <div className="col-xs-6 thumb">
                                                              <figure className="icon-overlay icn-link">
                                                                  <a href="portfolio-post.html"><img src="assets/images/art/work03.jpg" alt="" /></a>
                                                              </figure>
                                                          </div>
                                                          <div className="col-xs-6 thumb">
                                                              <figure className="icon-overlay icn-link">
                                                                  <a href="portfolio-post.html"><img src="assets/images/art/work04.jpg" alt="" /></a>
                                                              </figure>
                                                          </div>
                                                          <div className="col-xs-6 thumb">
                                                              <figure className="icon-overlay icn-link">
                                                                  <a href="portfolio-post.html"><img src="assets/images/art/work05.jpg" alt="" /></a>
                                                              </figure>
                                                          </div>
                                                          <div className="col-xs-6 thumb">
                                                              <figure className="icon-overlay icn-link">
                                                                  <a href="portfolio-post.html"><img src="assets/images/art/work06.jpg" alt="" /></a>
                                                              </figure>
                                                          </div>
                                                          <div className="col-xs-6 thumb">
                                                              <figure className="icon-overlay icn-link">
                                                                  <a href="portfolio-post.html"><img src="assets/images/art/work07.jpg" alt="" /></a>
                                                              </figure>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="col-sm-3 inner">
                                                      <h4>About Us</h4>
                                                      <p>Voluptat ibusaped molorporro consequ idustibus. Reressi morum ut dolessiti tem nihicid ernatum, coria volore non pro officat ut autem accaborem conet. Omnis peribus qui dolent praeperrum coria.</p>
                                                      <p>Equam conesti occum dolorest, quae venderes quistius, comnitatur sae dinam nonseculpa cum fugit is verciam.</p>
                                                      <a href="about.html" className="btn">Read More</a>
                                                  </div>
                                              </div>
                                          </li>
                                      </ul>
                                  </li>
                                  <li className="dropdown">
                                      <a href="" className="dropdown-toggle" data-toggle="dropdown">Contact</a>
                                      <ul className="dropdown-menu">
                                          <li><a href="contact.html">Contact I</a></li>
                                          <li><a href="contact2.html">Contact II</a></li>
                                          <li><a href="contact3.html">Contact III</a></li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </header>
      );
  }
}

export default Header;
