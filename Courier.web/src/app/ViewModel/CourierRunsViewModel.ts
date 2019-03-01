export class CourierRuns {
  constructor(public courierRunsId?: number, public runName?: string,  public isRegularRun?: boolean) {
    this.courierRunsId = courierRunsId;
    this.runName = runName;
    this.isRegularRun = isRegularRun;

  }
}


