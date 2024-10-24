import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  signupUsers: any[] = [];
  signupObj: any = {
    Firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  loginObj: any = {
    email: '',
    password: '',
  };

  modalMessage: string = '';
  isModalVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onsginup() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      Firstname: '',
      lastname: '',
      email: '',
      password: '',
    };

    this.modalMessage = 'Hi ' + this.signupUsers[this.signupUsers.length - 1].Firstname + '!';
    this.isModalVisible = true;

    setTimeout(() => {
      this.isModalVisible = false; // Close the modal
      this.router.navigateByUrl('/home');
    }, 4000);
  }

  onlogin() {
    const isUserExist = this.signupUsers.find(
      (m) => m.email === this.loginObj.email && m.password === this.loginObj.password
    );

    if (isUserExist) {
      this.modalMessage = 'Hi ' + isUserExist.Firstname + '!';
      this.isModalVisible = true;

      setTimeout(() => {
        this.isModalVisible = false; // Close the modal
        this.router.navigateByUrl('/home');
      }, 4000);
    } else {
      this.modalMessage = 'Wrong credentials';
      this.isModalVisible = true;

      setTimeout(() => {
        this.isModalVisible = false; // Close the modal
      }, 4000);
    }
  }

  // for switching
  showLogin: boolean = true;

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  goToSignUp() {
    this.showLogin = false;
  }

  // for Subscribe
  SubscribeUser: any[] = [];
  SubscribeObj: any = {
    mail: '',
  };

  onSubscribe() {
    const isMailExist = this.SubscribeUser.find((m) => m.mail === this.SubscribeObj.mail);

    if (isMailExist) {
      this.modalMessage = 'Email already subscribed';
      this.isModalVisible = true;

      setTimeout(() => {
        this.isModalVisible = false; // Close the modal
      }, 4000);
    } else {
      this.SubscribeUser.push(this.SubscribeObj);
      localStorage.setItem('SubscribeUser', JSON.stringify(this.SubscribeUser));

      this.modalMessage = 'faile subscribed';
      this.isModalVisible = true;

      setTimeout(() => {
        this.isModalVisible = false; // Close the modal
        this.router.navigateByUrl('/home');
      }, 4000);

      // Reset the SubscribeObj
      this.SubscribeObj = {
        mail: '',
      };
    }
  }
}
