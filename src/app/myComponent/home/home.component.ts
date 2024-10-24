import { Component } from '@angular/core';
import { AppComponent } from "../../app.component";
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router){
  }
  navigateToProducts() {
    this.router.navigateByUrl('/products');
  }
  navigateToNOTFOUND(){
    this.router.navigateByUrl('/**');


  }

}
