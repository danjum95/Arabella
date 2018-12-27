import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KursantMenuComponent } from './kursant-menu/kursant-menu.component';
import { InstruktorMenuComponent } from './instruktor-menu/instruktor-menu.component';
import { OskMenuComponent } from './osk-menu/osk-menu.component';
import { RegisterComponent } from './register/register.component';
import { OskListComponent } from './osk-list/osk-list.component';
import { RegisterInstruktorComponent } from './register-instruktor/register-instruktor.component';
import { InstruktorListComponent } from './instruktor-list/instruktor-list.component';
import { KursantListComponent } from './kursant-list/kursant-list.component';
import { SettingsComponent } from './settings/settings.component';
import { MessageComponent } from './message/message.component';
import { RegisterOskOrKursantComponent } from './register-osk-or-kursant/register-osk-or-kursant.component';
import { RegisterOskComponent } from './register-osk/register-osk.component';
import { InstruktorListKursantComponent } from './instruktor-list-kursant/instruktor-list-kursant.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalComponent } from './cal/cal.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    LoginComponent,
    KursantMenuComponent,
    InstruktorMenuComponent,
    OskMenuComponent,
    RegisterComponent,
    OskListComponent,
    RegisterInstruktorComponent,
    InstruktorListComponent,
    KursantListComponent,
    SettingsComponent,
    MessageComponent,
    RegisterOskOrKursantComponent,
    RegisterOskComponent,
    InstruktorListKursantComponent,
    CalComponent,
    ContractListComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'oskMenu',
        component: OskMenuComponent,
        children: [
          {
            path: 'message',
            component: MessageComponent
          },
          {
            path: 'registerInstruktor',
            component: RegisterInstruktorComponent
          },
          {
            path: 'instruktorList',
            component: InstruktorListComponent,
          },
          {
            path: 'kursantList',
            component: KursantListComponent
          },
          {
            path: 'settings',
            component: SettingsComponent
          },
          {
            path: 'calendar',
            component: CalComponent
          },
          {
            path: 'contract',
            component: ContractListComponent
          }
        ]
      },
      {
        path: 'instruktorMenu',
        component: InstruktorMenuComponent,
        children: [
          {
            path: 'message',
            component: MessageComponent
          },
          {
            path: 'instruktorList',
            component: InstruktorListComponent,
          },
          {
            path: 'kursantList',
            component: KursantListComponent
          },
          {
            path: 'settings',
            component: SettingsComponent
          },
          {
            path: 'calendar',
            component: CalComponent
          }
        ]
      },
      {
        path: 'kursantMenu',
        component: KursantMenuComponent,
        children: [
          {
            path: 'message',
            component: MessageComponent
          },
          {
            path: 'map',
            component: MapComponent
          },
          {
            path: 'instruktorList',
            component: InstruktorListKursantComponent,
          },
          {
            path: 'settings',
            component: SettingsComponent
          },
          {
            path: 'calendar',
            component: CalComponent
          }
        ]
      },
      {
        path: 'registerKursant',
        component: RegisterComponent
      },
      {
        path: 'oskList',
        component: OskListComponent
      },
      {
        path: 'register',
        component: RegisterOskOrKursantComponent
      },
      {
        path: 'registerOsk',
        component: RegisterOskComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
