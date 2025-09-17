import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { NotificationComponent } from './app/notification/notification.component'; // 👈 Importa o NotificationComponent

bootstrapApplication(NotificationComponent, appConfig)
  .catch((err) => console.error(err));
