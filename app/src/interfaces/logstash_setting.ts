import { ScpClient } from "node-scp";

export interface LogstashSettingInterface {
    id: string;
    connection_name: string;
    username: string;
    password: string;
    ip: string;
    directory: string;
    input_path: string;
    grok_pattern: string;
    elasticsearch_host: string;
    index_name: string;
}

export interface LogstashSettingRepositoryInterface {
    findAll(
        page: number,
        pageSize: number,
        searchTerm: string,
        searchBy: string[],
        sort: string,
        sortBy: string[]
    ): Promise<LogstashSettingInterface[]>;
    scpConnect(ip: string, username: string, password: string): Promise<ScpClient>;
    save(scpClient: ScpClient, directory: string, connection_name: string, body: object): Promise<void>;
    retry(id: string): Promise<{ logstashSetting: LogstashSettingInterface, configData: any }>;
    create(logstash_setting: LogstashSettingInterface): Promise<{ newLogstashSetting: LogstashSettingInterface, configData: any }>;
    update(id: string, logstash_setting: LogstashSettingInterface): Promise<LogstashSettingInterface>;
    delete(id: string): Promise<LogstashSettingInterface>;
    findById(id: string): Promise<LogstashSettingInterface | null>;
    findByName (connection_name: string): Promise<LogstashSettingInterface | null>;
}