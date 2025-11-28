import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  form!: FormGroup;
  items: any;
  id: string | null = null;
  loading = false;
  nasaData: any;
  constructor(private fb: FormBuilder, private service: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['']
    });
    this.id = this.route.snapshot.paramMap.get('id'); if (this.id) this.getData(this.id);
    this.fetch();
    this.getAPIDetails();
  }

  getAPIDetails(){
    this.service.nasaAPI().subscribe((data: any) => {
      if(data){
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
}
