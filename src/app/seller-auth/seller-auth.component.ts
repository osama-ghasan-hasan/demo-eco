import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';
  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: signUp): void {
    this.seller.userSignup(data);
  }
  
  login(data: login): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password is not correct';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
