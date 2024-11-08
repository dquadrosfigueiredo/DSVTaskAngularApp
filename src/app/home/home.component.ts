import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IPerson } from '../model/interface/IPerson';
import { CommonModule } from '@angular/common';
import { IPlanet } from '../model/interface/IPlanet';
import { IStarship } from '../model/interface/IStarship';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  http = inject(HttpClient);
  people: IPerson[] = [];
  planets: IPlanet[] = [];
  starships: IStarship[] = [];
  list: boolean = true;

  private rawPeopleData$ = new Subject<IPerson[]>();

  ngOnInit(): void {
    this.getDataFromApi();


  }


  setList() {
    this.list = !this.list;
  }

  private getHomeworldInfoById(homeworldId: number): IPlanet | undefined {
    return this.planets.find(planet => planet.id === homeworldId);
  }

  private getStarshipsByIds(starshipIds: number[]): IStarship[] {
    return this.starships.filter(starship => starshipIds.includes(starship.id));
  }

  getDataFromApi() {

    this.http.get<IPlanet[]>("https://localhost:7159/Api/planets").subscribe((res) => {
      this.planets = res;
    });

    this.http.get<IStarship[]>("https://localhost:7159/Api/starships").subscribe((res) => {
      this.starships = res;
    });
    this.http.get<IPerson[]>("https://localhost:7159/Api/people")
      .subscribe(res => {

        this.people = res;
        console.log("Fetch complete");


        // this.people.forEach(person => {
        //    person.homeworld = this.getHomeworldById(person.homeworldId)?.name;
        // });

        console.log("Processing people details");
        this.people = res.map(person => ({
          ...person,
          homeworld: this.getHomeworldInfoById(person.homeworldId),
          starships: this.getStarshipsByIds(person.starshipsIds)
        }));
      });



  }
}
