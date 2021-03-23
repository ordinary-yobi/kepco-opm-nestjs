import { OpmResponse, RawResponse } from '../kepco-opm.response';

/**
 *
 */
export class CustNoInfo {
  // custNm, 고객명
  private customerName: string;

  // custNo, 고객번호
  private customerNumber: string;

  // ictg, 계약종명
  private ictg: string;

  // ikw, 전력소비량
  private ikw: number;

  // inds, 업종명
  private industry: string;

  public setCustomerName(name: string): void {
    this.customerName = name;
  }

  public setCustomerNumber(customerNumber: string): void {
    this.customerNumber = customerNumber;
  }

  public setIctg(ictg: string): void {
    this.ictg = ictg;
  }

  public setIkw(ikw: number): void {
    this.ikw = ikw;
  }

  public setIndustry(industry: string): void {
    this.industry = industry;
  }
}

/**
 * {"custNoInfoList":[{"custNm":"고객명","custNo":"고객번호","ictg":"계약종명","ikw" :5,"inds":"업종명"},{"custNm":"고객명2","custNo":"고객번호2","ictg":"계약종명2","i kw":5,"inds":"업종명2"}]}
 */
export class GetCustNoListResponse extends OpmResponse<CustNoInfo> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'custNoInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const customerInfo = new CustNoInfo();

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'custNm':
            customerInfo.setCustomerName(value);
            return;
          case 'custNo':
            customerInfo.setCustomerNumber(value);
            return;
          case 'ictg': // 계약종명, 20
            customerInfo.setIctg(value);
            return;
          case 'ikw': // 전력소비량 (14,4)
            customerInfo.setIkw(value);
            return;
          case 'inds': // 업종명, 20
            customerInfo.setIndustry(value);
            return;
        }

        console.log(`UnhandledKey:${key}`);
      });

      return customerInfo;
    });

    this.data.push(...data);
  }
}
