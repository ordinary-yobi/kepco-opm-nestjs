import { ModuleMetadata } from '@nestjs/common';

/**
 * Sample module option
 */
export interface KepcoOPMConfig {
  /**
   * key
   * required
   */
  serviceKey: string;
}

/**
 * Sample module option
 */
export interface KepcoOPMModuleAsyncConfig
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Function returning options (or a Promise resolving to options) to configure the Sample module.
   * @param args
   */
  useFactory?: (...args: any[]) => Promise<KepcoOPMConfig> | KepcoOPMConfig;
  /**
   * Dependencies that a Factory may inject.
   */
  inject?: any[];
}

/**
 *
 */
export type QueryParameterMap = {
  serviceKey?: string;
  [key: string]: string;
};
