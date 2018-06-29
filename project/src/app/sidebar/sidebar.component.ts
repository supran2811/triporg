import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  @Output() closeDrawerClicked = new EventEmitter();

  public constructor(private router:Router) {}

  closeSideBar() {
    console.log("Close icon clicked!!");
    this.closeDrawerClicked.emit();
  }

  loginClicked() {
    this.closeDrawerClicked.emit();
    this.router.navigate(['login']);
  }

  registerClicked() {
    this.closeDrawerClicked.emit();
    this.router.navigate(['register']);
  }

  navigateToHome() {
    this.closeDrawerClicked.emit();
    this.router.navigateByUrl('/');
  }
}
