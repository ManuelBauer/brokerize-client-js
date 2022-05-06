/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  # connecting brokers and synchronizing data to brokerize  The general approach is that users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. For example, an end user can add a Consorsbank login by calling [AddSession](#operation/AddSession). Note that brokerize *never* saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their data are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios)). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available via the API until deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).   # performing actions in portfolios Actions can be performed in portfolios that have online sessions. Using [GetAuthInfo](#operation/GetAuthInfo), different methods for authorising an action can be figured out. For example, some brokers support mTAN, where an SMS is sent for a specific use-case (e.g. a set of parameters for order creation). Other brokers allow authorizing actions with their mobile apps. Brokerizes unifies that information in `AuthInfo`. Usually, an action requires creation of a challenge (for mTAN that would be when the broker sends an SMS with a code) and later the actual action with a response for that challenge. The following actions are implemented:  - Session TAN handling (for performing other actions in portfolios without further per-case authorization)     - [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge)     - [EnableSessionTan](#operation/EnableSessionTan)     - [EndSessionTan](#operation/EndSessionTan) - Create a trade     - [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio     - [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade     - [CreateTrade](#operation/CreateTrade) to perform the trade. - Edit an order (e.g. cancel or change specific fields)     - *not implemented yet*  # rate limits Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior.
 *
 * The version of the OpenAPI document: 0.0.1-preview
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    BrokerName,
    BrokerNameFromJSON,
    BrokerNameFromJSONTyped,
    BrokerNameToJSON,
} from './BrokerName';

/**
 * 
 * @export
 * @interface PortfoliosResponsePortfolios
 */
export interface PortfoliosResponsePortfolios {
    /**
     * 
     * @type {Array<string>}
     * @memberof PortfoliosResponsePortfolios
     */
    sessionIds: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof PortfoliosResponsePortfolios
     */
    portfolioName: string;
    /**
     * 
     * @type {BrokerName}
     * @memberof PortfoliosResponsePortfolios
     */
    brokerName: BrokerName;
    /**
     * 
     * @type {string}
     * @memberof PortfoliosResponsePortfolios
     */
    id: string;
}

export function PortfoliosResponsePortfoliosFromJSON(json: any): PortfoliosResponsePortfolios {
    return PortfoliosResponsePortfoliosFromJSONTyped(json, false);
}

export function PortfoliosResponsePortfoliosFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortfoliosResponsePortfolios {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sessionIds': json['sessionIds'],
        'portfolioName': json['portfolioName'],
        'brokerName': BrokerNameFromJSON(json['brokerName']),
        'id': json['id'],
    };
}

export function PortfoliosResponsePortfoliosToJSON(value?: PortfoliosResponsePortfolios | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sessionIds': value.sessionIds,
        'portfolioName': value.portfolioName,
        'brokerName': BrokerNameToJSON(value.brokerName),
        'id': value.id,
    };
}

