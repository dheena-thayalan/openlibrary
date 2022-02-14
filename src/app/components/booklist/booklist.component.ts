import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {
  selectedValue = null;
  isbookload: boolean = false;
  isLoading!: boolean;
  bookdata: any[] = [];
  data: any;

  shearchbook(event: any) {
    this.isLoading = true;
    this.service.retrive(event)?.pipe(map(data => {
      return data;
    })).subscribe(data => {
      this.bookdata = data?.docs;
      this.isLoading = false;
    });
    if (this.selectedValue == null) this.loadData();
  }

  constructor(private service: BookService,) { }
  ngOnInit(): void { }
  loadData(): void {
    this.data = null;
    if (this.selectedValue != null) {
      this.isbookload = true;
      this.service.list(this.selectedValue)?.subscribe(data => {
        this.data = data;
      })
    } else { this.isbookload = false; }
  }

}

