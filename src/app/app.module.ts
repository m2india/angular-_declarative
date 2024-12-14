import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './pages/home/home.component';
import { DeclarativeComponent } from './pages/declarative/declarative.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    ParentComponent,
    ChildComponent,
    HomeComponent,
    DeclarativeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
