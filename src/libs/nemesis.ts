import request = require("request");

export interface IPagingResult <T>{
    count?: number;
    content?: Array<T>;
}

export interface ICompetition {
    id: number;
    caption: string;
    league: string;
    year: number;
    numberOfTeams: number;
    numberOfGames: number;
    lastUpdated: Date;
}

export interface IResult {
    goalsHomeTeam: number;
    goalsAwayTeam: number;
}

export interface IFixture {
    id: number;
    competitionId: number;
    date: Date;
    matchday: number;
    homeTeamName: string;
    homeTeamId: number;
    awayTeamName: string;
    awayTeamId: string;
    result: IResult;
}

export interface ITeam {
    id: number;
    name: string;
    shortName: string;
    squadMarketValue: string;
    crestUrl: string;
}

export interface IPlayer {
    id: number;
    name: string;
    position: string;
    jerseyNumber: number;
    dateOfBirth: Date;
    nationality: string;
    contractUntil: Date;
    marketValue: number;
}

export interface  LeagueTable {
    rank: number;
    team: string;
    teamId: number;
    playedGames: number;
    crestURI: string;
    points: number;
    goals: number;
    goalsAgainst: number;
    goalDifference: number;
}

export interface INemesisFeature {
    /**
     * url Root Setter
     */
    setRootUrl: (rootUrl: string) => void;

    /**
     * url Root Getter
     */
    getRootUrl: () => string;

    /**
     * List all available competitions.
     */
    getCompetitions: (year: number) => any;

    /**
     * List all fixtures for a certain competition.
     */
    getFixturesByCompetition: (competitionId: number, matchday: number) => any;
}

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

export class Nemesis extends NemesisFeature implements INemesisFeature {
    public args: inputArguments;
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
        let response: IPagingResult<ICompetition> = {};
        return request.get(this.getRootUrl() + `competitions/?season=${year}`)
            .on("response", (_response: IPagingResult<ICompetition>) => {
                response = _response;
            })
            .on("error", (error) => {
                throw Error(error.message)
            });
    }

    public getFixturesByCompetition(competitionId: number, matchday: number): any {
        let response: IFixture[] = [];
        request.get(this.getRootUrl() + `competitions/${competitionId}/fixtures/matchday=${matchday}`)
            .on("response", (_response: IFixture[]) => {
                response = _response
                return _response;
            })
            .on("error", (error) => {
                throw Error(error.message)
            });
        return response;
    }
}