import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { User } from './user';

import { AppComponent } from './app.component';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [User, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
