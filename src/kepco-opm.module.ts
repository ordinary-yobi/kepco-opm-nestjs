import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import { KepcoOpmDrApiService } from './service/dr-api/kepco-opm-dr-api.service';
import { KEPCO_OPM_MODULE_CONFIG_KEY } from './constants';
import { KepcoOPMConfig, KepcoOPMModuleAsyncConfig } from './interfaces';
import { KepcoOpmOpenApiService } from './service/open-api/kepco-opm-open-api.service';
import { KepcoOpmService } from './service/kepco-opm.service';
import { KepcoOpmKukminApiService } from './service/kukmin-api/kepco-opm-kukmin-api.service';

/**
 * Sample NestJS Module
 */
@Module({})
export class KepcoOpmModule {
  /**
   *
   * @param config
   */
  static register(config?: KepcoOPMConfig): DynamicModule {
    return {
      module: KepcoOpmModule,
      imports: [HttpModule],
      providers: [
        {
          provide: KEPCO_OPM_MODULE_CONFIG_KEY,
          useValue: config,
        },
        KepcoOpmService,
        KepcoOpmDrApiService,
        KepcoOpmOpenApiService,
        KepcoOpmKukminApiService,
      ],
      exports: [KepcoOpmDrApiService, KepcoOpmDrApiService],
    };
  }

  /**
   *
   * @param config
   */
  static registerAsync(config?: KepcoOPMModuleAsyncConfig): DynamicModule {
    const { useFactory, imports = [], inject } = config;
    return {
      module: KepcoOpmModule,
      imports: [HttpModule, ...imports],
      providers: [
        {
          provide: KEPCO_OPM_MODULE_CONFIG_KEY,
          useFactory,
          inject,
        },
        KepcoOpmService,
        KepcoOpmDrApiService,
        KepcoOpmOpenApiService,
        KepcoOpmKukminApiService,
      ],
      exports: [KepcoOpmDrApiService, KepcoOpmOpenApiService],
    };
  }
}
