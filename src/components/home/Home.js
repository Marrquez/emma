import React, { Component } from 'react';
import './Home.css';
import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyASXRq8JJxCxvGdXN8riUagnH5xsIpu0eI",
    authDomain: "emma-a01fb.firebaseapp.com",
    databaseURL: "https://emma-a01fb.firebaseio.com",
    projectId: "emma-a01fb",
    storageBucket: "",
    messagingSenderId: "713887186173"
};
firebase.initializeApp(config);

class Home extends Component {
    constructor(){
        super();
        this.state = {
            user: {email:'', logged:false, data: {}},
            page: "home"
        }
    }
    componentWillMount(){
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                firebase.database().ref('users/' + user.uid).on('value', function(snapshot){
                    user.address = snapshot.val() ? snapshot.val().address : "";
                    user.description = snapshot.val() ? snapshot.val().description : "";
                    user.location = snapshot.val() ? snapshot.val().location : "";
                    user.name = snapshot.val() ? snapshot.val().username : "";
                    let newData ={
                        email:user.email || user.displayName,
                        logged:true,
                        data: user
                    };
                    self.setState({user:newData});
                    if(snapshot.val() && snapshot.val().enterprise) {
                        user.enterprise = snapshot.val().enterprise;
                    }else if(self.state.user.logged && user.uid) {
                        self.updateUser(user.name, user.address, user.description, user.location, true);
                    }
                });
            } else {
                let newData = {
                    email:'',
                    logged:false,
                    data: {}
                };
                this.setState({user:newData});
                this.setState({page:'home'});
            }
        }.bind(this));
    }
    signInUser(params){
        firebase.auth().createUserWithEmailAndPassword(params.email, params.pswd).then(function(){

        }).catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // ...
        });
    }
    signOutUser(params){
        firebase.auth().signOut().then(function() {

        }).catch(function(error) {
            // An error happened.
        });
    }
    logInUser(params){
        firebase.auth().signInWithEmailAndPassword(params.email, params.pswd).then(function(){

        }).catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // ...
        });
    }
    updateUser(name, address, description, location, doNothowNotification){
        var self = this;
        var database = firebase.database();
        let userId = this.state.user.data.uid;

        database.ref('users/' + userId).set({
            username: name,
            address: address,
            description : description,
            location: location,
        }).then(function(){
            if(!doNothowNotification){
                self.notify("La información se guardó correctamente");
            }
        });
    }
    navigate(view, data){
        this.setState({page: view});
    }
    logUser(provider, providerType){
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            //var token = result.credential.accessToken;
            //var secret = result.credential.secret;
            // The signed-in user info.
            //var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
            // ...
        });
    }
    recoverByEmail(email){
        var self = this;
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(email).then(function() {
            self.notify("Ha sido enviado un email a: " + email + " con instrucciones para la recuperación de tu contraseña");
        }).catch(function(error) {
            self.notify("Ha ocurrido un error al tratar de recuperar tu contraseña");
            // An error happened.
        });
    }
  render() {
      return (
          <div>
              <header>
                  <div className="navbar">
                      <div className="navbar-header">
                          <div className="container">
                              <ul className="info pull-left">
                                  <li><a href=""><i className="icon-mail-1 contact"></i> info@reen.com</a></li>
                                  <li><i className="icon-mobile contact"></i> +00 (123) 456 78 90</li>
                              </ul>
                              <ul className="social pull-right">
                                  <li><a href=""><i className="icon-s-facebook"></i></a></li>
                                  <li><a href=""><i className="icon-s-gplus"></i></a></li>
                                  <li><a href=""><i className="icon-s-twitter"></i></a></li>
                                  <li><a href=""><i className="icon-s-pinterest"></i></a></li>
                                  <li><a href=""><i className="icon-s-behance"></i></a></li>
                                  <li><a href=""><i className="icon-s-dribbble"></i></a></li>
                              </ul>
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

                                      <li className="dropdown pull-right searchbox">
                                          <a href="" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-search"></i></a>

                                          <div className="dropdown-menu">
                                              <form id="search" className="navbar-form search" role="search">
                                                  <input type="search" className="form-control" placeholder="Type to search" />
                                                      <button type="submit" className="btn btn-default btn-submit icon-right-open"></button>
                                              </form>
                                          </div>
                                      </li>

                                  </ul>



                              </div>
                          </div>
                      </div>
                  </div>
              </header>






              <main>



                  <section id="hero">
                      <div id="owl-main" className="owl-carousel height-md owl-inner-nav owl-ui-lg">

                          <div className="item" style={{backgroundImage: "url('assets/images/art/slider01.jpg')"}}>
                              <div className="container">
                                  <div className="caption vertical-center text-center">

                                      <h1 className="fadeInDown-1 light-color">Made for Designers</h1>
                                      <p className="fadeInDown-2 medium-color">Create your online portfolio in minutes with the professionally and lovingly designed REEN website template. Customize your site with versatile and easy to use features.</p>
                                      <div className="fadeInDown-3">
                                          <a href="" className="btn btn-large">Get started now</a>
                                      </div>

                                  </div>
                              </div>
                          </div>

                          <div className="item" style={{backgroundImage: "url('assets/images/art/slider02.jpg')"}}>
                              <div className="container">
                                  <div className="caption vertical-center text-right">

                                      <h1 className="fadeInLeft-1 light-color">Fresh and <br />beautiful design</h1>
                                      <p className="fadeInLeft-2 light-color">REEN is designed to showcase your talent and put your work in the forefront. <br />Professionally use of typography and layout that fits your content.</p>
                                      <div className="fadeInLeft-3">
                                          <a href="" className="btn btn-large">Get started now</a>
                                      </div>

                                  </div>
                              </div>
                          </div>

                          <div className="item" style={{backgroundImage: "url('assets/images/art/slider03.jpg')"}}>
                              <div className="container">
                                  <div className="caption vertical-center text-left">

                                      <h1 className="fadeInRight-1 dark-bg light-color"><span>Clean and <br />reusable code</span></h1>
                                      <p className="fadeInRight-2 dark-color">The clean code allows you to easily copy code blocks from content <br />modules and past them in different places or layouts.</p>
                                      <div className="fadeInRight-3">
                                          <a href="" className="btn btn-large">Get started now</a>
                                      </div>

                                  </div>
                              </div>
                          </div>

                          <div className="item" style={{backgroundImage: "url('assets/images/art/slider04.jpg')"}}>
                              <div className="container">
                                  <div className="caption vertical-top text-right">

                                      <h1 className="fadeIn-1 dark-bg light-color"><span>Just focus on <br />your creativity</span></h1>
                                      <p className="fadeIn-2 light-color">Take a break from messing around with heavy coding and spend <br />your time brainstorming ideas for your next project.</p>
                                      <div className="fadeIn-3">
                                          <a href="" className="btn btn-large">Get started now</a>
                                      </div>

                                  </div>
                              </div>
                          </div>

                          <div className="item" style={{backgroundImage: "url('assets/images/art/slider05.jpg')"}}>
                              <div className="container">
                                  <div className="caption vertical-top text-center">

                                      <h1 className="fadeInDown-1 light-color">Showcase <br />your content</h1>
                                      <p className="fadeInDown-2 medium-color">With REEN you have the possibility to create websites for various <br />contents quickly and easily. Now it's up to you!</p>
                                      <div className="fadeInDown-3">
                                          <a href="" className="btn btn-large">Get started now</a>
                                      </div>

                                  </div>
                              </div>
                          </div>

                      </div>
                  </section>






                  <section id="product">
                      <div className="container inner">

                          <div className="row">

                              <div className="col-sm-6 inner-right-xs text-right">
                                  <figure><img src="assets/images/art/product01.jpg" alt="" /></figure>
                              </div>

                              <div className="col-sm-6 inner-top-xs inner-left-xs">
                                  <h2>Fully flexible user interface</h2>
                                  <p>Magnis modipsae que lib voloratati andigen daepeditem quiate ut reporemni aut labor. Laceaque quiae sitiorem rest non restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta oreprerum tibusam. Eumenis et consent accullignis dentibea autem inisita posae volor conecus resto explabo.</p>
                                  <a href="" className="txt-btn">Check out the functions</a>
                              </div>

                          </div>

                          <div className="row inner-top-md">

                              <div className="col-sm-6 col-sm-push-6 inner-left-xs">
                                  <figure><img src="assets/images/art/product02.jpg" alt="" /></figure>
                              </div>

                              <div className="col-sm-6 col-sm-pull-6 inner-top-xs inner-right-xs">
                                  <h2>Over 14,000 designs available</h2>
                                  <p>Magnis modipsae que lib voloratati andigen daepeditem quiate es reporemus aut labor. Laceaque quiae sitiorem rest non restibusaes dem tumquam core posae volor remped modis volor. Doloreiur quia commolu ptatemp dolupta oreprerum tibusam eumenis et consent accullignis lib dentibea autem inisita. Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem.</p>
                                  <a href="" className="txt-btn">Visit the showroom</a>
                              </div>

                          </div>

                          <div className="row inner-top-md">

                              <div className="col-sm-6 inner-right-xs text-right">
                                  <figure><img src="assets/images/art/product03.jpg" alt="" /></figure>
                              </div>

                              <div className="col-sm-6 inner-top-xs inner-left-xs">
                                  <h2>Social media made even easier</h2>
                                  <p>Magnis modipsae que lib voloratati andigen daepeditem quiate ut reporemni aut labor. Laceaque quiae sitiorem rest non restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta oreprerum tibusam emnis et consent accullignis.</p>
                                  <a href="" className="txt-btn">Learn more about it</a>
                              </div>

                          </div>

                      </div>
                  </section>






                  <section id="visit-our-store" className="img-bg img-bg-soft tint-bg" style={{backgroundImage: "url('assets/images/art/image-background04.jpg')"}}>
                      <div className="container inner">

                          <div className="row">
                              <div className="col-md-8 col-sm-9">
                                  <header>
                                      <h1>Customize your own model</h1>
                                      <p>Magnis modipsae que voloratati andigen daepeditem quiate conecus aut labore. Laceaque quiae sitiorem rest non restibusaes maio es dem tumquam explabo.</p>
                                  </header>
                                  <a href="" className="btn btn-large">Visit our store</a>
                              </div>
                          </div>

                      </div>
                  </section>






                  <section id="reasons">
                      <div className="container inner">

                          <div className="row">
                              <div className="col-md-8 col-sm-9 center-block text-center">
                                  <header>
                                      <h1>5 Reasons <br />why you should use our product</h1>
                                      <p>Doloreiur quia commolu dolupta oreprerum tibusam.</p>
                                  </header>
                              </div>
                          </div>

                          <div className="row inner-top-sm">
                              <div className="col-xs-12">
                                  <div className="tabs tabs-reasons tabs-circle-top tab-container">

                                      <ul className="etabs text-center">
                                          <li className="tab"><a href="#tab-1"><div>1</div>Function</a></li>
                                          <li className="tab"><a href="#tab-2"><div>2</div>Simplicity</a></li>
                                          <li className="tab"><a href="#tab-3"><div>3</div>Design</a></li>
                                          <li className="tab"><a href="#tab-4"><div>4</div>Social</a></li>
                                          <li className="tab"><a href="#tab-5"><div>5</div>Community</a></li>
                                      </ul>

                                      <div className="panel-container">

                                          <div className="tab-content" id="tab-1">
                                              <div className="row">

                                                  <div className="col-md-5 col-md-push-5 col-md-offset-1 col-sm-6 col-sm-push-6 inner-left-xs">
                                                      <figure><img src="assets/images/art/product04.jpg" alt="" /></figure>
                                                  </div>

                                                  <div className="col-md-5 col-md-pull-5 col-sm-6 col-sm-pull-6 inner-top-xs inner-right-xs">
                                                      <h3>Function</h3>
                                                      <p>Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus.</p>
                                                  </div>

                                              </div>
                                          </div>

                                          <div className="tab-content" id="tab-2">
                                              <div className="row">

                                                  <div className="col-md-5 col-md-offset-1 col-sm-6 inner-right-xs">
                                                      <figure><img src="assets/images/art/product05.jpg" alt="" /></figure>
                                                  </div>

                                                  <div className="col-md-5 col-sm-6 inner-top-xs inner-left-xs">
                                                      <h3>Simplicity</h3>
                                                      <p>Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus.</p>
                                                  </div>

                                              </div>
                                          </div>

                                          <div className="tab-content" id="tab-3">
                                              <div className="row">

                                                  <div className="col-md-4 col-md-push-3 col-md-offset-1 col-sm-6 inner-left-xs inner-right-xs">
                                                      <figure><img src="assets/images/art/product06.jpg" alt="" /></figure>
                                                  </div>

                                                  <div className="col-md-3 col-md-pull-4 col-sm-6 inner-top-xs">
                                                      <h3>Design</h3>
                                                      <p>Magnis modipsae lib voloratati andigen daepedor quiate aut labor. Laceaque quiae sitiorem resti est lore tumquam core posae volor uso remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent it accullignis orum lomnus.</p>
                                                  </div>

                                                  <div className="col-md-3 col-sm-6 inner-top-xs">
                                                      <h3>User interface</h3>
                                                      <p>Magnis modipsae lib voloratati andigen daepedor quiate aut labor. Laceaque quiae sitiorem resti est lore tumquam core posae volor uso remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent it accullignis orum lomnus.</p>
                                                  </div>

                                              </div>
                                          </div>

                                          <div className="tab-content" id="tab-4">

                                              <div className="row">
                                                  <div className="col-md-5 col-sm-6 col-xs-8 center-block text-center">
                                                      <figure><img src="assets/images/art/product03.jpg" alt="" /></figure>
                                                  </div>
                                              </div>

                                              <div className="row">
                                                  <div className="col-sm-8 center-block text-center inner-top-xs">
                                                      <h3>Social</h3>
                                                      <p>Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus.</p>
                                                  </div>
                                              </div>

                                          </div>

                                          <div className="tab-content" id="tab-5">
                                              <div className="row">
                                                  <div className="col-md-8 col-sm-9 center-block text-center">
                                                      <h3>Community</h3>
                                                      <p>Magnis modipsae que lib voloratati andigen daepeditem quiate ut reporemni aut labor. Laceaque quiae sitiorem rest non restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta oreprerum tibusam emnis et consent accullignis.</p>
                                                  </div>
                                              </div>
                                          </div>

                                      </div>

                                  </div>
                              </div>
                          </div>

                      </div>
                  </section>






                  <section id="get-in-touch" className="inner-bottom">
                      <div className="container inner light-bg">
                          <div className="row">
                              <div className="col-md-8 col-sm-9 center-block text-center">
                                  <header>
                                      <h1>Want to work with us?</h1>
                                      <p>Magnis modipsae que voloratati andigen daepeditem quiate re porem aut labor. Laceaque quiae sitiorem rest non restibusaes maio es dem tumquam.</p>
                                  </header>
                                  <a href="contact.html" className="btn btn-large">Get in touch</a>
                              </div>
                          </div>
                      </div>
                  </section>



              </main>






              <footer className="dark-bg">
                  <div className="container inner">
                      <div className="row">

                          <div className="col-md-3 col-sm-6 inner">
                              <h4>Who we are</h4>
                              <a href="index.html"><img className="logo img-intext" src="assets/images/logo-white.svg" alt="" /></a>
                              <p>Magnis modipsae voloratati andigen daepeditem quiate re porem que aut labor. Laceaque eictemperum quiae sitiorem rest non restibusaes maio es dem tumquam.</p>
                              <a href="about.html" className="txt-btn">More about us</a>
                          </div>

                          <div className="col-md-3 col-sm-6 inner">
                              <h4>Latest works</h4>

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
                                          <a href="portfolio-post.html"><img src="assets/images/art/work07.jpg" alt="" /></a>
                                      </figure>
                                  </div>

                                  <div className="col-xs-6 thumb">
                                      <figure className="icon-overlay icn-link">
                                          <a href="portfolio-post.html"><img src="assets/images/art/work01.jpg" alt="" /></a>
                                      </figure>
                                  </div>

                              </div>
                          </div>


                          <div className="col-md-3 col-sm-6 inner">
                              <h4>Get In Touch</h4>
                              <p>Doloreiur quia commolu ptatemp dolupta oreprerum tibusam eumenis et consent accullignis dentibea autem inisita.</p>
                              <ul className="contacts">
                                  <li><i className="icon-location contact"></i> 84 Street, City, State 24813</li>
                                  <li><i className="icon-mobile contact"></i> +00 (123) 456 78 90</li>
                                  <li><a href=""><i className="icon-mail-1 contact"></i> info@reen.com</a></li>
                              </ul>
                          </div>

                          <div className="col-md-3 col-sm-6 inner">
                              <h4>Free updates</h4>
                              <p>Conecus iure posae volor remped modis aut lor volor accabora incim resto explabo.</p>
                              <form id="newsletter" className="form-inline newsletter">
                                  <label className="sr-only" htmlFor="exampleInputEmail">Email address</label>
                                  <input type="email" className="form-control" id="exampleInputEmail" placeholder="Enter your email address" />
                                      <button type="submit" className="btn btn-default btn-submit">Subscribe</button>
                              </form>
                          </div>

                      </div>
                  </div>

                  <div className="footer-bottom">
                      <div className="container inner">
                          <p className="pull-left">© 2017 REEN. All rights reserved.</p>
                          <ul className="footer-menu pull-right">
                              <li><a href="index.html">Home</a></li>
                              <li><a href="portfolio.html">Portfolio</a></li>
                              <li><a href="blog.html">Blog</a></li>
                              <li><a href="about.html">About</a></li>
                              <li><a href="services.html">Services</a></li>
                              <li><a href="contact.html">Contact</a></li>
                          </ul>
                      </div>
                  </div>
              </footer>
          </div>
      );
  }
}

export default Home;
