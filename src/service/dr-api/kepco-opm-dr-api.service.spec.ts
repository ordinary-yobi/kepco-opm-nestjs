import { Test, TestingModule } from '@nestjs/testing';
import { KepcoOpmDrApiService } from './kepco-opm-dr-api.service';
import { KepcoOpmModule } from '../../kepco-opm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Synchronously register Module', () => {
  let service: KepcoOpmDrApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KepcoOpmModule.registerAsync({
          imports: [ConfigModule.forRoot()],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const serviceKey = configService.get<string>('EDS_SERVICE_KEY');
            return {
              serviceKey,
            };
          },
        }),
      ],
    }).compile();

    service = module.get<KepcoOpmDrApiService>(KepcoOpmDrApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getDayLpData', async () => {
    const result = await service.getDayLpData({
      custNo: '0227207493',
      date: '20210323',
    });
    console.log(result);
  });

  // it('getAllCustomerPeriodData', () => {
  //   const date = '20200301';
  //   const result = service.getAllCustomerPeriodData({
  //     date,
  //   });
  //   console.log(result);
  // });
  //
  // it('getCustomerBillData', () => {
  //   const result = service.getCustomerBillData({
  //     dataMonth: '202003',
  //     custNo: '1111111111',
  //   });
  //   console.log(result);
  // });
  //
  // it('getCustomerInfoData', () => {
  //   const result = service.getCustomerInfoData();
  //   console.log(result);
  // });
  //
  // it('getCustomerMeterList', () => {
  //   const result = service.getCustomerMeterList();
  //   console.log(result);
  // });
  //
  // it('getCustomerNoList', async () => {
  //   const result = await service.getCustomerNoList();
  //   console.log(result);
  // });
  //
  // it('getMinuteLpData', () => {
  //   const result = service.getMinuteLpData();
  //   console.log(result);
  // });
  //
  // it('getPeriodData', () => {
  //   const result = service.getPeriodData();
  //   console.log(result);
  // });
});
