import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  communities:any;
  homes:any;
constructor(private appService:AppServiceService)
{

}
  ngOnInit() {
   this.appService.getCommunity().subscribe(value=>
    {
      this.communities = Object.values(value).sort((obj1, obj2)=>{
        if (obj1.name > obj2.name) {
          return 1;
      }
  
      if (obj1.name < obj2.name) {
          return -1;
      }

      return 0;
      });
      this.getHousePrices();
    });
  }

  getHousePrices()
  {
    this.appService.getHome().subscribe(value=>
      {
        this.homes =  Object.values(value);
        console.log("this.homes",this.homes);
        console.log("this.communities", this.communities);
        this.communities.forEach(community => { 
          let price =0;
          let numOfHouses=0;
          this.homes.forEach(home => {
            if(community.id==home.communityId)
            {
              numOfHouses= numOfHouses+1;
              price=price+home.price;
            }
          });
          let avg = price/numOfHouses;
          if(avg)
          {
            community['avgPrice']=avg;
          }
        });
      });
  }
}
