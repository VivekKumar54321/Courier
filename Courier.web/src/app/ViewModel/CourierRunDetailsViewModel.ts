import { Courier } from './CourierViewModel';
import { CourierRuns } from './CourierRunsViewModel';


export class CourierRunDetails
{
  constructor(public courierRunDetailId?: number, public courier?: Courier, public courierId?: number, public courierRuns?: CourierRuns, public courierRunsId?: number, public numberOfSamples?: number, public courierArrivalTime?: Date)
  {
    this.courierRunDetailId = courierRunDetailId;
    this.courier = courier;
    this.courierId = courierId;
    this.courierRuns = courierRuns;
    this.courierRunsId = courierRunsId;
    this.numberOfSamples = numberOfSamples;
    this.courierArrivalTime = courierArrivalTime;
    
  }
}

export class DropDownCourierRun {
  constructor(public Id?: number, public Value?: string)
  {
    this.Id = Id;
    this.Value = Value;


  }
}
export class DropDownCourier {
  constructor(public Id?: number, public Value?: string) {
    this.Id = Id;
    this.Value = Value;


  }
}
