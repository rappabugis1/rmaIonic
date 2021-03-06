import { Component , ViewChild, HostListener} from '@angular/core';
import { NavController, Platform, Content, Slides } from 'ionic-angular';

import {ScrollHideConfig} from '../../directives/headerhider';

import {FirestoreProvider} from '../../providers/providers-data-firestore/providers-data-firestore';
import { ProductPage } from '../product/product';
import { Product } from '../../datamodels/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild('productSlides') slides: Slides;

  platW;
  productsObs;
  meniSakriven:boolean =false;
  productsArray;
  slidesPerView :number=1;
  btnShid:boolean=true;
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 75 };

  slide1 ; slide2 ; slide3 ;

  constructor(public navCtrl: NavController,private fireStoreProvider: FirestoreProvider, public platform:Platform) {
    this.productsObs = this.fireStoreProvider.getProductListObs().valueChanges();
    this.platW=this.platform.width();
    this.checkResize();
  }
        
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.platW=event.target.innerWidth;
    this.checkResize();
  }

  checkResize(){
    if(this.platW > 550) {
      this.btnShid=false;
      this.slide1="assets/imgs/slide1.jpg";
      this.slide2="assets/imgs/hope.jpg";
      this.slide3="assets/imgs/lopata.jpg";
      if(this.platW > 750)
        this.slidesPerView=3;
        else
        this.slidesPerView=2;
    }else{
      this.slidesPerView=1;
      this.btnShid=true;
      this.slide1="assets/imgs/slide1-small.jpg";
      this.slide2="assets/imgs/hope-small.jpg";
      this.slide3="assets/imgs/lopata-small.jpg";
    }
  }

  
  scrollBottom(){
    if(this.content._scroll) this.content.scrollToBottom(0);
  }

  scrollTop(){
    if(this.content._scroll) this.content.scrollToTop(0);
  }

  scroll(){
    if(this.content._scroll) this.content.scrollTo(0,550,0);
  }

  hack(val){
    return Array.from(val);
  }
  
  meniClick(){
    this.meniSakriven=!this.meniSakriven;
  }

  ngOnInit() {
    this.productsObs = this.fireStoreProvider.getProductListObs().valueChanges();
  }

  proslijediProduct(prod){
    this.fireStoreProvider.getProductListObs().valueChanges()
    .subscribe(products => {
        this.productsArray= products;
        this.navCtrl.push(ProductPage, {prod: prod, products:this.productsArray });
    });
  }

  buttonDesno(){
    this.slides.slideNext();
  }

  buttonLijevo(){
    this.slides.slidePrev();
  }

}