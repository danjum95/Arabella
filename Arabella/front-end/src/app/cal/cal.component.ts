import { AuthorizationService } from './../authorization.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { OnInit, ViewChild, Component } from '@angular/core';
import { lessonListInterface } from '../interface/lessonListInterface';


@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css']
})
export class CalComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  myLogin: string;
  lessons: any;
  isInstructor: boolean;
  allKursants$: any;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected Auth: AuthorizationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.Auth.getSchool(localStorage.getItem('userToken')).subscribe(data => {
      this.allKursants$ = this.Auth.getLesson(localStorage.getItem('userToken'), data.id);
    });

    this.Auth.getUserDetails(localStorage.getItem('userToken')).subscribe(data => {
      switch (data.accountType) {
        case 0:
          this.Auth.getSchoolLessons(localStorage.getItem('userToken')).subscribe(data => {
            this.lessons = JSON.stringify(data);
            this.lessons = this.lessons.replace(/date/g,"start");
            this.lessons = this.lessons.replace(/endDate/g,"end");
            this.calendarOptions = {
              editable: false,
              eventLimit: false,
              handleWindowResize: true,
              locale:	'pl',
              buttonText: {
                today: 'Dzisiaj',
                month: 'Miesiąc',
                week: 'Tydzień',
                day: 'Dzień',
                list: 'Plan tygodnia',
              },
              header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
              },
              views: {
                agendaWeek: {
                  columnFormat: 'ddd D - M',
                }
              },
              slotLabelFormat:"HH:mm",
              timeFormat: 'H(:mm)',
              allDaySlot: false,
              noEventsMessage:"Brak wydarzeń do wyświetlenia",
              events: JSON.parse(this.lessons)
            };
          });
        break;

        case 1:
          this.isInstructor = true;
          this.Auth.getInstruktorLessons(localStorage.getItem('userToken')).subscribe(data => {
            this.lessons = JSON.stringify(data);
            this.lessons = this.lessons.replace(/date/g,"start");
            this.lessons = this.lessons.replace(/endDate/g,"end");
            this.calendarOptions = {
              editable: false,
              eventLimit: false,
              locale:	'pl',
              handleWindowResize: true,
              buttonText: {
                today: 'Dzisiaj',
                month: 'Miesiąc',
                week: 'Tydzień',
                day: 'Dzień',
                list: 'Plan tygodnia',
              },
              header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
              },
              views: {
                agendaWeek: {
                  columnFormat: 'ddd D - M',
                }
              },
              slotLabelFormat:"HH:mm",
              timeFormat: 'H(:mm)',
              allDaySlot: false,
              noEventsMessage:"Brak wydarzeń do wyświetlenia",
              events: JSON.parse(this.lessons)
            };
          });
        break;

        case 2:
          this.Auth.getKursantLessons(localStorage.getItem('userToken')).subscribe(data => {
            this.lessons = JSON.stringify(data);
            this.lessons = this.lessons.replace(/date/g,"start");
            this.lessons = this.lessons.replace(/endDate/g,"end");
            this.calendarOptions = {
              editable: false,
              handleWindowResize: true,
              eventLimit: false,
              locale:	'pl',
              buttonText: {
                today: 'Dzisiaj',
                month: 'Miesiąc',
                week: 'Tydzień',
                day: 'Dzień',
                list: 'Plan tygodnia',
              },
              header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
              },
              views: {
                agendaWeek: {
                  columnFormat: 'ddd D - M',
                }
              },
              slotLabelFormat:"HH:mm",
              timeFormat: 'H(:mm)',
              allDaySlot: false,
              noEventsMessage:"Brak wydarzeń do wyświetlenia",
              events: JSON.parse(this.lessons)
              };
            });
        break;
      }
    });

  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  addLesson(email: any , date: any, hours: any) {
    this.Auth.addLesson(localStorage.getItem('userToken'), email, date, hours).subscribe(data => {
      console.log("LESSON ADDED");
    });
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }
}
