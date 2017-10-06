/// <reference path="../types/nemesis.d.ts" />
import * as Definition from "Definition";

import request = require("request");

export abstract class NemesisFeature {
    constructor() {
        ;
    }

    /**
     * 
     * @param rootUrl 
     */
    abstract setRootUrl(rootUrl: string): void;

    /**
     * 
     */
    abstract getRootUrl(): string;

    /**
     * 
     * @param year
     * @description retrieve all competition by a specific year
     * @return a list of competitions
     */
    abstract getCompetitions(year: number): any;

    /**
     * @param competitionId
     * @param matchday
     * @description retrieve fixtures by a specific competition
     * @return a list of fixtures
     */
    abstract getFixturesByCompetition(competitionId: number, matchday: number): any;
}

type inputArguments = {
    API_TOKEN: string,
    URL_ROOT: string
}

export default class Nemesis extends NemesisFeature implements Definition.INemesisFeature {
    public args: inputArguments;
    public toto: Definition.ICompetition;
    constructor(apiToken: string, private rootUrl: string, ) {
        super();
        this.init();
    }

    public help() {
        console.log("Get started");
        console.log("Usage");
        console.log("nemesis --apiToken API_TOKEN --urlROOT URL_ROOT");
        console.log("npm start --apiToken API_TOKEN --urlROOT URL_ROOT");
    }

    public init(): void {
        this.args = {
            API_TOKEN: "",
            URL_ROOT: ""
        }
    }

    public setRootUrl(rootUrl: string): void {
        this.rootUrl = rootUrl;
    }
    public getRootUrl(): string {
        return this.rootUrl;
    }

    public getCompetitions(year: number): any {
        let response: Definition.IPagingResult<Definition.ICompetition> = {};
        return request.get(this.getRootUrl() + `competitions/?season=${year}`)
            .on("response", (_response: Definition.IPagingResult<Definition.ICompetition>) => {
                response = _response;
            })
            .on("error", (error) => {
                throw Error(error.message)
            });
    }

    public getFixturesByCompetition(competitionId: number, matchday: number): any {
        let response: Definition.IFixture[] = [];
        request.get(this.getRootUrl() + `competitions/${competitionId}/fixtures/matchday=${matchday}`)
            .on("response", (_response: Definition.IFixture[]) => {
                response = _response
                return _response;
            })
            .on("error", (error) => {
                throw Error(error.message)
            });
        return response;
    }
}