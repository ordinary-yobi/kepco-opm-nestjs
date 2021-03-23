import { Test, TestingModule } from '@nestjs/testing';
import { KepcoOpmOpenApiService } from './kepco-opm-open-api.service';
import { KepcoOpmModule } from '../../kepco-opm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('Synchronously register Module', () => {
  let service: KepcoOpmOpenApiService;

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

    service = module.get<KepcoOpmOpenApiService>(KepcoOpmOpenApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getDayLpData', async () => {
    const result = await service.getDayLpData({
      custNo: '0227207493',
      date: '20210324',
    });
    console.log(JSON.stringify(result.getData()));
  });

  it('getMinuteLpData', async () => {
    const result = await service.getMinuteLpData({
      custNo: '0227207493',
      dateTime: '202103011400',
    });
    console.log(JSON.stringify(result.getData()));
  });

  it('getCustNoList', async () => {
    const result = await service.getCustNoList();
    console.log(JSON.stringify(result.getData()));
  });

  it('getCustMeterList', async () => {
    const result = await service.getCustMeterList();
    console.log(JSON.stringify(result.getData()));
  });

  it('getAllCustPeriodData', async () => {
    const date = '20200301';
    const result = await service.getAllCustPeriodData({
      date,
    });
    console.log(JSON.stringify(result.getData()));
  });

  it('getPeriodData', async () => {
    const result = await service.getPeriodData({
      custNo: '0227207493',
      sDate: '20210301',
      endDate: '20210302',
      sTime: '1200',
      endTime: '1400',
    });
    console.log(JSON.stringify(result.getData()));
  });

  it('getCustInfoData', async () => {
    const result = await service.getCustInfoData({
      custNo: '0227207493',
    });
    console.log(JSON.stringify(result.getData()));
  });

  it('getCustJoinInfoData', async () => {
    const result = await service.getCustJoinInfoData({
      custNo: '0227207493',
      bizNo: '',
    });
    console.log(JSON.stringify(result.getData()));
  });
});
