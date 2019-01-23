import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterOskComponent } from './register-osk/register-osk.component';
import { OskMenuComponent } from './osk-menu/osk-menu.component';
import { MessageComponent } from './message/message.component';
import { RegisterInstruktorComponent } from './register-instruktor/register-instruktor.component';
import { InstruktorListComponent } from './instruktor-list/instruktor-list.component';
import { KursantListComponent } from './kursant-list/kursant-list.component';
import { SettingsComponent } from './settings/settings.component';
import { CalComponent } from './cal/cal.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { InstruktorMenuComponent } from './instruktor-menu/instruktor-menu.component';
import { KursantMenuComponent } from './kursant-menu/kursant-menu.component';
import { MapComponent } from './map/map.component';
import { InstruktorListKursantComponent } from './instruktor-list-kursant/instruktor-list-kursant.component';
import { OskListComponent } from './osk-list/osk-list.component';
import { SendLinkActiveComponent } from './send-link-active/send-link-active.component';
import { SendActiveOskComponent } from './send-active-osk/send-active-osk.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registerKursant',
    component: RegisterComponent
  },
  {
    path: 'registerOsk',
    component: RegisterOskComponent
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
    path: 'oskList',
    component: OskListComponent
  },
  {
    path: 'sendEmail',
    component: SendLinkActiveComponent
  },
  {
    path: 'activeOsk',
    component: SendActiveOskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
