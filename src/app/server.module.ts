import { AppModule } from './app.module';
import { ServerModule } from '@angular/platform-server';
import { NgModule } from '@angular/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { User } from './user';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [User],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
