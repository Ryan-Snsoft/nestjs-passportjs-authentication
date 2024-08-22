import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EtcdService {
    private readonly etcd: Etcd3;

    constructor(private configService: ConfigService) {
        // Init etcd client
        const endPoint = this.configService.get<string>('ETCD_ENDPOINT');
        if (!endPoint) {
            throw new Error("EndPoint not defined");
        }

        this.etcd = new Etcd3({ hosts: endPoint });
    }

    async getJWTSecret(): Promise<string> {
        try {
            // Retrieve value from etcd with raw key
            const base64Key = this.configService.get<string>('ETCD_JWT_SECRET_KEY');
            const key = Buffer.from(base64Key, 'base64').toString('utf8');

            if (!key) {
                throw new Error ('Secret key not defined');
            }

            const value = await this.etcd.get(key).string();
            if (!value) {
                throw new Error(`Value for key ${key} not found`);
            }

            return value;
        } catch (error) {
            console.error('Failed to get JWT secret:', error );
            throw error;
        }
    }
}
