import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
// Interfaces
import { HttpAdapter } from "../interfaces/http-adapter.interface.js";
// Utils
import { DEFAULT_BASE_URL_POKEAPI, DEFAULT_MESSAGE_ERROR } from "../../utils/const.js";

@Injectable()
export class HttpClientAxios implements HttpAdapter {

    private _client: AxiosInstance;

    constructor(
        private readonly _configService: ConfigService
    ){
        this._client = axios.create({
            baseURL: this._configService.get('baseUrlPokeApi') ?? DEFAULT_BASE_URL_POKEAPI
        });
    }

    async get<T>(url:string): Promise<T> {
        try {
            const { data: res } = await this._client.get<T>(url);
            return res;
            
        } catch (error: any) {
            throw new Error(DEFAULT_MESSAGE_ERROR);
        }
    }

    async post<T>(url: string, body: any, headers?: AxiosRequestConfig): Promise<T> {
        try {
            const { data: res } = await this._client.post<T>(url, body, headers);
            return res;
            
        } catch (error: any) {
            throw new Error(DEFAULT_MESSAGE_ERROR);
        }
    }
}