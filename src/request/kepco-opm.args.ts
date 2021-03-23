/**
 * 요청 기본
 */
type OpmArgs = {
  // 서비스키, required
  // length 255
  serviceKey?: string;

  // 고객번호, required
  // length 10
  custNo: string;

  // 일자, required
  // length 8
  // yyyymmdd
  date: string;
};

/**
 * 일단위 전력소비 데이터
 */
export type GetDayLpDataArgs = OpmArgs;

/**
 * 15분단위 전력소비 데이터
 */
export interface GetMinuteLpDataArgs extends Omit<OpmArgs, 'date'> {
  // 일자시분, required
  // yyyymmddhhmi
  dateTime: string;
}

/**
 * 고객번호 목록
 */
export type GetCustNoListArgs = Omit<OpmArgs, 'custNo' | 'date'>;

/**
 * 고객번호, 계기번호 목록
 */
export type GetCustMeterListArgs = Omit<OpmArgs, 'custNo' | 'date'>;

/**
 * 전체고객 특정시간의 전력소비 데이터
 */
export type GetAllCustPeriodDataArgs = Omit<OpmArgs, 'custNo'>;

/**
 * 특정고객의 특정기간의 전력소비 데이터
 */
export interface GetPeriodDataArgs extends Omit<OpmArgs, 'date'> {
  // 시작일자, required
  // length 8
  // yyyymmdd
  sDate: string;

  // 종료일자, required
  // length 8
  // yyyymmdd
  endDate: string;

  // 시작시간, required
  // length 4
  // hhmi
  sTime: string;

  // 종료시간, required
  // length 4
  // hhmi
  endTime: string;
}

/**
 * 고객계약정보
 */
export type GetCustInfoDataArgs = Omit<OpmArgs, 'date'>;

/**
 * 고객가입여부 확인
 */
export interface GetCustJoinInfoDataArgs extends Omit<OpmArgs, 'date'> {
  // 사업자번호
  bizNo: string;
}

/**
 * 고객요금정보
 */
export interface GetCustBillDataArgs extends Omit<OpmArgs, 'date'> {
  // 청구년월??, required
  // length 6
  dataMonth: string;
}
