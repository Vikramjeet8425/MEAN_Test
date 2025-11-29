import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { OrderService } from '../Services/order.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  form!: FormGroup;
  items: any;
  id: string | null = null;
  orderId: string | null = null;
  loading = false;
  nasaData: any;
  order = {
    userId: localStorage.getItem('userId'),
    productIds: [] as string[],
    totalAmount: 0
  };
  orders: any;
  constructor(private fb: FormBuilder, private service: ProductService, private router: Router, private route: ActivatedRoute, private orderServ: OrderService) { }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['']
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.getData(this.id);
    this.fetch();
    this.getAPIDetails();
    this.getAllOrders();
  }

  getAPIDetails() {
    this.service.nasaAPI().subscribe((data: any) => {
      if (data) {
        this.nasaData = data;
      }
    });
  }

  getData(id: string) {
    this.service.get(id).subscribe(d => this.form.patchValue(d));
  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value;

    if (this.id) {
      this.service.update(this.id, payload).subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/product']);
        } else {
          alert("Error Adding Product!");
        }
      });
    } else {
      this.service.create(payload).subscribe((data: any) => {
        if (data) {
          this.form.reset();
          this.fetch();
        } else {
          alert("Error Adding Product!");
        }
      });
    }
  }

  cancel() {
    this.form.reset();
  }

  fetch() {
    this.loading = true;
    this.service.getAll().subscribe((data: any) => {
      this.loading = false;
      if (data) {
        this.items = data;
      } else {
        alert("Error Fetching Products!");
      }
    });
  }

  deleteItem(id?: string) {
    if (!id) return; if (!confirm('Delete?')) return;
    this.service.delete(id).subscribe(() => this.fetch());
  }

  edit(id?: string) {
    if (id) this.router.navigate(['/edit', id]);
  }

  calculateTotal() {
    console.log("Clicked", this.order.productIds);
    this.order.totalAmount = this.items
      .filter((p: any) => this.order.productIds.includes(p._id))
      .reduce((sum: any, p: any) => sum + p.price, 0);
  }

  orderSubmit() {
    if (this.orderId) {
      this.orderServ.update(this.orderId, this.order).subscribe((data: any) => {
        if (data) {
          this.order.productIds = [];
          this.order.totalAmount = 0;
          this.orderId = null;
          this.getAllOrders();
        } else {
          alert("Error in updating order!");
        }
      });
    } else {
      this.orderServ.create(this.order).subscribe((data: any) => {
        if (data) {
          this.order.productIds = [];
          this.order.totalAmount = 0;
          this.orderId = null;
          this.getAllOrders();
        } else {
          alert("Error in placing order!");
        }
      });
    }
  }

  editOrder(id: string) {
    this.orderId = id;
    this.orderServ.get(id).subscribe((data: any) => {
      if (data) {
        this.order = data;
      }
    });
  }

  deleteOrder(id: string) {
    this.orderServ.delete(id).subscribe(() => this.getAllOrders());
  }

  getAllOrders() {
    this.orderServ.getAll().subscribe((data: any) => {
      if (data) {
        this.orders = data;
      }
    });
  }

  toggleProduct(event: any, product: any) {
    if (event.target.checked) {
      this.order.productIds.push(product._id);
    } else {
      this.order.productIds = this.order.productIds.filter(id => id !== product._id);
    }
    this.calculateTotal();
  }

}
