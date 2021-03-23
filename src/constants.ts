/**
 *
 */
export const KEPCO_OPM_MODULE_CONFIG_KEY = 'KEPCO_OPM_MODULE_CONFIG_KEY';

/**
 * KEPCO OPM API 에서 제공해주는 DR 사업자용 API 목록
 */
export enum DrApiOperation {
  // 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
  getDayLpData = 'DrAPI/getDayLpData.do',
  // 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
  getMinuteLpData = 'DrAPI/getMinuteLpData.do',
}

/**
 * KEPCO OPM API 에서 제공해주는 OPEN API 목록
 */
export enum OpenApiOperation {
  // 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
  getDayLpData = 'OpenAPI/getDayLpData.do',
  // 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
  getMinuteLpData = 'OpenAPI/getMinuteLpData.do',
  // 고객번호 목록
  getCustNoList = 'OpenAPI/getCustNoList.do',
  // 고객번호, 계기번호 목록
  getCustMeterList = 'OpenAPI/getCustMeterList.do',
  // 전체고객의 요청일시 15분단위 4개 데이터
  getAllCustPeriodData = 'OpenAPI/getAllCustPeriodData.do',
  // 고객의 요청기간에 대한 전력소비 데이터
  getPeriodData = 'OpenAPI/getPeriodData.do',
  // 요청고객의 고객기본사항
  getCustInfoData = 'OpenAPI/getCustInfoData.do',
  // 요청고객의 전기요금 청구정보
  getCustBillData = 'OpenAPI/getCustBillData.do',
  // 고객 가입여부 및 정보 확인
  getCustJoinInfoData = 'OpenAPI/getCustJoinInfoData.do',
  // 요청고객의 요청일자에 대한 15분단위 하루치 96개 데이터
  getKukminDayLpData = 'KukminAPI/getKukminDayLpData.do',
  // 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
  getKukminMinuteLpData = 'KukminAPI/getKukminMinuteLpData.do',
}

/**
 * KEPCO OPM API 에서 제공하는 국민 DR API 목
 */
export enum KukminApiOperation {
  // 요청고객의 요청일자에 대한 15분단위 하루치 96개 데이터
  getKukminDayLpData = 'KukminAPI/getKukminDayLpData.do',
  // 요청고객의 요청일자시분에 대한 15분단위 1개 데이터
  getKukminMinuteLpData = 'KukminAPI/getKukminMinuteLpData.do',
}

/**
 *
 */
export type MeterType = {
  1: '고압기계식';
  12: '고압전자식-표준형';
  13: '고압전자식-기록형';
  14: '고압전자식-거래용';
  21: '저압기계식-기계식';
  22: '저압기계식-OMR';
  23: '저압기계식-RFID';
  31: '저압:전자식-심야용';
  32: '저압전자식-복합';
  33: '저압전자식-역률용';
  34: '저압전자식-표준형일반';
  35: '저압전자식-E타입';
  36: '저압전자식-G타입';
  37: '저압전자식-CT일체형';
  38: '저압전자식-AE타입';
  41: '최대수요전력(DM)';
  42: '저압전자식-RFID';
  99: '기타';
};

/**
 *
 */
export type ChildType = {
  1: '모수용';
  2: '자수용';
  3: '모자동시수용';
  4: '모자대상제외';
};
