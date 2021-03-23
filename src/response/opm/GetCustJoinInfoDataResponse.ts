import { OpmResponse, RawResponse } from '../kepco-opm.response';

/**
 *
 */
export class CustJoinInfo {
  // joinYn, 가입여부 확인, Y/N
  private isJoined: boolean;

  // infoYn, 고객정보 확인(고객번호 + 사업자번호 체크), Y/N
  private hasInfo: boolean;

  // agreeYn, 동의여부 확인, Y/N
  private hasAgreed: boolean;

  public setIsJoined(isJoined: boolean): void {
    this.isJoined = isJoined;
  }

  public setHasInfo(hasInfo: boolean): void {
    this.hasInfo = hasInfo;
  }

  public setHasAgreed(hasAgreed: boolean): void {
    this.hasAgreed = hasAgreed;
  }

  public getIsJoined(): boolean {
    return this.isJoined;
  }

  public getHasInfo(): boolean {
    return this.hasInfo;
  }

  public getHasAgreed(): boolean {
    return this.hasAgreed;
  }
}

/**
 * {"custJoinDataInfoList":[{"joinYn":"Y","infoYn":"Y","agreeYn":"Y"}]}
 */
export class GetCustJoinInfoDataResponse extends OpmResponse<CustJoinInfo> {
  constructor(rawResponse: RawResponse) {
    super(rawResponse, 'custJoinDataInfoList');

    const data = this.rawResponse[this.key].map((item) => {
      const keys = Object.keys(item);

      const customerInfo = new CustJoinInfo();

      keys.forEach((key) => {
        const value = item[key];

        switch (key) {
          case 'joinYn': // 가입여부 확인
            customerInfo.setIsJoined(value === 'Y');
            return;
          case 'infoYn': // 계약종명, 20
            customerInfo.setHasInfo(value === 'Y');
            return;
          case 'agreeYn': // 계약종명, 20
            customerInfo.setHasAgreed(value === 'Y');
            return;
        }

        console.log(`UnhandledKey:${key}`);
      });

      return customerInfo;
    });

    this.data.push(...data);
  }
}
