import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  deleteId: number;
  deleteName: string;
  products: Product[] = [];
  p = 1;
  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(temp: Product) {
    this.deleteId = temp.id;
    this.deleteName = temp.name;
  }

  delete(idDelete: any) {
    this.productService.deleteProduct(idDelete).subscribe(() => {
      this.getAll();
      Swal.fire('Tiêu đề', 'Xoá thành công', 'success');
    });
  }
}
