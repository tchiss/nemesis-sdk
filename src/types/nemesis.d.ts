
declare module "Definition" {
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
}
