import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { HeroesService } from "~app/services/heroes.service";

@Component({
  selector: "app-hero-profile",
  templateUrl: "./hero-profile.component.html",
  styleUrls: ["./hero-profile.component.scss"]
})
export class HeroProfileComponent implements OnInit {

  public hero$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroesService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHeroById(params.get('id')))
    )
    .subscribe((data) =>this.hero$ = data);
  }
}
