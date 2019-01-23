import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { RegisterOskComponent } from './register-osk/register-osk.component';
import { InstruktorListKursantComponent } from './instruktor-list-kursant/instruktor-list-kursant.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalComponent } from './cal/cal.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { MapComponent } from './map/map.component';
import { MatDialogModule, MatTableModule, MatCheckboxModule, MatButtonModule, 
  MatIconModule, MatMenuModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { AddLessonsComponent } from './add-lessons/add-lessons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SendLinkActiveComponent } from './send-link-active/send-link-active.component';
import { SendActiveOskComponent } from './send-active-osk/send-active-osk.component';

@NgModule({
  declarations: [
    AppComponent,
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
    RegisterOskComponent,
    InstruktorListKursantComponent,
    CalComponent,
    ContractListComponent,
    MapComponent,
    AddLessonsComponent,
    NavBarComponent,
    SendLinkActiveComponent,
    SendActiveOskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule,
  ],
  entryComponents: [
    AddLessonsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
