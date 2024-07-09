import { LogstashSettingRepositoryInterface, LogstashSettingInterface } from "../interfaces/logstash_setting";
import { LogstashSetting } from "../models/LogstashSetting";
import { dbDataSource } from "../configs/db.config";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db';
import { Client, ScpClient } from 'node-scp';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

export class LogstashSettingService implements LogstashSettingRepositoryInterface {
    async scpConnect(ip: string, username: string, password: string): Promise<ScpClient> {
        return await Client({
            host: ip,
            port: 22,
            username: username,
            password: password,
        });
    }
    async save(scpClient: ScpClient, directory: string, connection_name: string, body: object): Promise<void> {
        const templatePath = path.resolve(__dirname, '../logstash.conf.ejs');
        const outputPath = path.resolve(__dirname, `../temp/${connection_name}/logstash.conf`);
        const template = fs.readFileSync(templatePath, 'utf-8');
        const logstashConfig = ejs.render(template, body);

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        fs.writeFileSync(outputPath, logstashConfig, 'utf-8');
    
        await scpClient.uploadFile(outputPath, directory);
        scpClient.close();
    }
    async retry(id: string): Promise<{ logstashSetting: LogstashSettingInterface, configData: any }> {
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        const logstashSetting = await logstashSettingRepository.findOneBy({ id });
        if(!logstashSetting) {
            throw new Error("Logstash Setting not found");
        }
        const configData = {
            inputPath: logstashSetting.input_path,
            logType: logstashSetting.connection_name,
            grokPattern: logstashSetting.grok_pattern,
            elasticsearchHost: logstashSetting.elasticsearch_host,
            indexName: logstashSetting.index_name
        }

        return { logstashSetting, configData };
    }
    async create(logstash_setting: LogstashSettingInterface): Promise<{ newLogstashSetting: LogstashSettingInterface, configData: any }> {
        const newLogstashSetting = new LogstashSetting();
        newLogstashSetting.id = uuidv4();
        newLogstashSetting.connection_name = logstash_setting.connection_name;
        newLogstashSetting.ip = logstash_setting.ip;
        newLogstashSetting.username = logstash_setting.username;
        newLogstashSetting.password = logstash_setting.password;
        newLogstashSetting.directory = logstash_setting.directory;
        newLogstashSetting.input_path = logstash_setting.input_path;
        newLogstashSetting.grok_pattern = logstash_setting.grok_pattern;
        newLogstashSetting.elasticsearch_host = logstash_setting.elasticsearch_host;
        newLogstashSetting.index_name = logstash_setting.index_name;
        
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        
        await logstashSettingRepository.save(newLogstashSetting);

        const configData = {
            inputPath: logstash_setting.input_path,
            logType: logstash_setting.connection_name,
            grokPattern: logstash_setting.grok_pattern,
            elasticsearchHost: logstash_setting.elasticsearch_host,
            indexName: logstash_setting.index_name
        }
        
        return { newLogstashSetting, configData };
    }
    async update(id: string, logstash_setting: LogstashSettingInterface): Promise<LogstashSettingInterface> {
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        
        const logstashSettingToUpdate = await logstashSettingRepository.findOneBy({ id });
        if(!logstashSettingToUpdate) {
            throw new Error("Logstash Setting not found");
        }
        logstashSettingToUpdate.connection_name = logstash_setting.connection_name;
        logstashSettingToUpdate.ip = logstash_setting.ip
        logstashSettingToUpdate.username = logstash_setting.username;
        logstashSettingToUpdate.password = logstash_setting.password;
        logstashSettingToUpdate.directory = logstash_setting.directory;
        logstashSettingToUpdate.input_path = logstash_setting.input_path;
        logstashSettingToUpdate.grok_pattern = logstash_setting.grok_pattern;
        logstashSettingToUpdate.elasticsearch_host = logstash_setting.elasticsearch_host;
        logstashSettingToUpdate.index_name = logstash_setting.index_name;

        await logstashSettingRepository.save(logstashSettingToUpdate);
        
        return logstashSettingToUpdate;    
    }
    async delete(id: string): Promise<LogstashSettingInterface> {
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        const logstashSettingToDelete = await logstashSettingRepository.findOneBy({ id });
        if(!logstashSettingToDelete){
            throw new Error("Logstash Setting not found");
        }
        await logstashSettingRepository.delete(logstashSettingToDelete.id);
        
        return logstashSettingToDelete;
    }
    async findAll(
        page: number = 1,
        amount: number = 10,
        search: string = '',
        search_by: string[] = ['connection_name'],
        sort: string = 'ASC',
        sort_by: string[] = ['created_at']
    ): Promise<LogstashSettingInterface[]> {
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        const logstashSettings = await logstashSettingRepository.find({
            skip: dbUtils.skipPage(page, amount),
            take: amount,
            where: dbUtils.whereConditions(search_by, search),
            order: dbUtils.orderConditions(sort_by, sort),
        });

        return logstashSettings;
    }
    async findById(id: string): Promise<LogstashSettingInterface | null> {
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        const logstashSetting = await logstashSettingRepository.findOneBy({ id });
        if(!logstashSetting){
            throw new Error("Logstash Setting not found");
        }
        
        return logstashSetting;
    }
    async findByName(connection_name: string): Promise<LogstashSettingInterface | null> {
        const logstashSettingRepository = dbDataSource.getRepository(LogstashSetting);
        const logstashSetting = await logstashSettingRepository.findOneBy({ connection_name });
        if(!logstashSetting){
            throw new Error("Logstash Setting not found");
        }
        
        return logstashSetting;  
    }

}