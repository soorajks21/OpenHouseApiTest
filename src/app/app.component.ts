import { Component, OnInit, ViewChild } from "@angular/core";

import { AppServiceService } from "../app/app-service.service";

@Component({
  selector: "app-root",

  templateUrl: "./app.component.html",

  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  communities: any;
  homes: any;
  showLoader: boolean = true;
  showModal: boolean = true;

  subTitle = "Please click on retry to retrieve data.";

  defaultLink = "/assets/sample-image.jpg";

  @ViewChild("myModal") myModal;

  constructor(private appService: AppServiceService) {}

  ngOnInit() {
    this.getCommunityData();
  }

  getCommunityData() {
    this.appService.getCommunity().subscribe(
      value => {
        this.communities = Object.values(value).sort((obj1, obj2) => {
          if (obj1.name > obj2.name) {
            return 1;
          }

          if (obj1.name < obj2.name) {
            return -1;
          }

          return 0;
        });
        this.getHousePrices();
      },
      error => {
        this.myModal.nativeElement.className = "modal show";
      }
    );
  }

  // For demo and testing data fetch failure
  getCommunityDataFailed() {
    this.appService.getCommunityFailed().subscribe(
      value => {
        this.communities = Object.values(value).sort((obj1, obj2) => {
          if (obj1.name > obj2.name) {
            return 1;
          }

          if (obj1.name < obj2.name) {
            return -1;
          }

          return 0;
        });

        this.getHousePrices();
      },
      error => {
        this.closeModal();
      }
    );
  }

  getHousePrices() {
    this.appService.getHome().subscribe(
      value => {
        this.homes = Object.values(value);

        this.communities.forEach(community => {
          let price = 0;

          let numOfHouses = 0;

          this.homes.forEach(home => {
            if (community.id == home.communityId) {
              numOfHouses = numOfHouses + 1;

              price = price + home.price;
            }
          });

          let avg = price / numOfHouses;

          if (avg) {
            community["avgPrice"] = avg;
          }
        });

        this.showLoader = false;
      },
      error => {
        this.closeModal();
      }
    );
  }

  retryDataFetch() {
    this.myModal.nativeElement.className = "modal fade";
    this.showLoader = true;
    this.getCommunityData();
  }

  closeModal() {
    this.myModal.nativeElement.className = "modal show";

    this.showLoader = false;
  }
}
