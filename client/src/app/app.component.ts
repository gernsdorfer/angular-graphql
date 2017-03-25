import {Component} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';

const Persons = gql`
  query Persons {
    people {
      id
      firstName
      lastName
      
    }
  }
`;

@Component({
  selector: 'app-root',
  template: `
            <h1>
              {{title}}
            </h1>
              <ul *ngFor="let person of data | async | select: 'people'">
                Person: {{person.firstName}},{{person.lastName}} 
              </ul>
            
            `
})
export class AppComponent {
  title = 'GraphQL - DEMO';
  data: any;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.data = this.apollo.watchQuery({
      query: Persons
    });
    //.subscribe(({data}) => {
    //console.log(data.loading);
    //this.loading = data.loading;
    //this.currentUser = data.allPersons;
    //});
  }
}
