import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imageParent: string = '';
  showImage = true;
  products: Product[] = [];
  token = '';
  imgRta = '';

  constructor(
    private AuthService: AuthService,
    private tokenService: TokenService,
    private UserService: UsersService,
    private FileService: FilesService
  ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.AuthService.getProfile()
      .subscribe()
    }
  }

  onLoaded(image: string){
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  createUser() {
    this.UserService.create({
      name: 'Mateo',
      email: 'mateo.floorez@gmail.com',
      password: '123456',
      role: 'admin'
    })
    .subscribe(data => {
      console.log(data)
    })
  }

  downloadPdf(){
    this.FileService.getFile('My pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  uploadFile(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.FileService.uploadFile(file)
      .subscribe(response => {
        this.imgRta = response.location;
      })
    }

  }

}
