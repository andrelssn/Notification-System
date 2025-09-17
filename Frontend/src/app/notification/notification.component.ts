// src/app/notification/notification.component.ts

import { Component, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { v4 as uuidv4 } from 'uuid';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // 👈 Import CommonModule
import { FormsModule } from '@angular/forms';     // 👈 Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,  // 👈 Add standalone: true
  imports: [CommonModule, FormsModule], // 👈 Add the imports array
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnDestroy {
  content = '';
  list: Array<any> = [];
  pollingSub: Subscription;


  constructor(private svc: NotificationService) {
    this.pollingSub = interval(3000).subscribe(() => this.pollAll());
  }


  send() {
    const id = uuidv4();
    this.svc.send(id, this.content).subscribe(() => {
      this.list.unshift({ messageId: id, content: this.content, status: 'PENDING' });
      this.content = '';
    });
  }


  pollAll() {
    this.list.forEach(item => {
      if (item.status === 'PENDING' || item.status === 'PROCESSING') {
        this.svc.status(item.messageId).subscribe((res: any) => {
          if (res && res.status) item.status = res.status;
        }, _ => { });
      }
    });
  }


  ngOnDestroy() {
    this.pollingSub.unsubscribe();
  }
}
