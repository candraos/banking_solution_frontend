import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,   ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banking_solution_frontend';
}
