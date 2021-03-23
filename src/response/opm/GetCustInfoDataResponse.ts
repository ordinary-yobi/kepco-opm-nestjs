import { OpmResponse, RawResponse } from '../kepco-opm.response';
import { ChildType, MeterType } from '../../constants';

/**
 *
 */
export class CustInfo {
  // custNo, 고객번호, 10
  private customerNumber: string;

  // meter, 계기번호, 20
  private meter: string;

  // etong_cd, 계기유형, 15
  private meterType: MeterType;

  // 계기배수, 15
  private meterMultiplication: number;

  // 계기역률, 15
  private powerFactor: number;

  //
  private contractPower: number;

  //
  private selectedPricing: string;

  //
  private numberOfHouseHold: number;

  //
  private numberOfTelevisions: number;

  //
  private isAmi: boolean;

  //
  private serviceStartedDate: string;

  //
  private holderChangedDate: string;

  //
  private childType?: ChildType;

  public setCustomerNumber(customerNumber: string): void {
    this.customerNumber = customerNumber;
  }

  public setMeter(meter: string): void {
    this.meter = meter;
  }

  public setMeterType(meterType: MeterType): void {
    this.meterType = meterType;
  }

  public setMeterMultiplication(meterMultiplication: number): void {
    this.meterMultiplication = meterMultiplication;
  }

  public setPowerFactor(powerFactor: number): void {
    this.powerFactor = powerFactor;
  }

  public setContractPower(contractPower: number): void {
    this.contractPower = contractPower;
  }

  public setSelectedPricing(selectedPricing: string): void {
    this.selectedPricing = selectedPricing;
  }

  public setNumberOfHouseHold(numberOfHouseHold: number): void {
    this.numberOfHouseHold = numberOfHouseHold;
  }

  public setNumberOfTelevisions(numberOfTelevisions: number): void {
    this.numberOfTelevisions = numberOfTelevisions;
  }

  public setIsAmi(isAmi: boolean): void {
    this.isAmi = isAmi;
  }

  public setServiceStartedDate(serviceStartedDate: string): void {
    this.serviceStartedDate = serviceStartedDate;
  }

  public setHolderChangedDate(holderChangedDate: string): void {
    this.holderChangedDate = holderChangedDate;
  }

  public setChildType(childType: ChildType): void {
    this.childType = childType;
  }
}

/**
 * {"custInfoDataInfoList":[{"custNo":"고객번호","meter":"계기번호","etong_cd":"계기 유형","meter_mval":1,"pwrfact":90,"cntr_pwr":5,"sel_cost":"선택요금","hshcnt":1 ,"tv_cnt":1,"amr_yn":"N","nm_chg_date":"명의변경일","onsvc_ymd":"송전일자","pchi ld_clcd":"모자구분"}]}
 */
export class GetCustInfoDataResponse extends OpmResponse<CustInfo> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'custInfoDataInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const customerInfo = new CustInfo();

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'custNo':
            customerInfo.setCustomerNumber(value);
            return;
          case 'meter': // 계약종명, 20
            customerInfo.setMeter(value);
            return;
          case 'etong_cd': // 계기유형, 15
            customerInfo.setMeterType(value);
            return;
          case 'meter_mval': // 계기배수, 15
            customerInfo.setMeterMultiplication(value);
            return;
          case 'pwrfact': // 계기역률, 15
            customerInfo.setPowerFactor(value);
            return;

          case 'cntr_pwr': // 계약전력, 25
            customerInfo.setContractPower(value);
            return;

          case 'sel_cost': // 선택요금, 20
            customerInfo.setSelectedPricing(value);
            return;

          case 'hshcnt': // 가구수, 5
            customerInfo.setNumberOfHouseHold(value);
            return;

          case 'tv_cnt': // tv 수, 5
            customerInfo.setNumberOfTelevisions(value);
            return;

          case 'amr_yn': // AMI 구분
            customerInfo.setIsAmi(value);
            return;

          case 'nm_chg_date': // 명의 변경일, 8, yyyymmdd
            customerInfo.setHolderChangedDate(value);
            return;

          case 'onsvc_ymd': // 송전일자, 8, yyyymmdd
            customerInfo.setServiceStartedDate(value);
            return;

          case 'pchild_clcd': // 모자구분, 1
            customerInfo.setChildType(value);
            return;
        }

        console.log(`UnhandledKey:${key}`);
      });

      return customerInfo;
    });

    this.data.push(...data);
  }
}
