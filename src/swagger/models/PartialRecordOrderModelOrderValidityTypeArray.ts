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
    OrderValidityType,
    OrderValidityTypeFromJSON,
    OrderValidityTypeFromJSONTyped,
    OrderValidityTypeToJSON,
} from './OrderValidityType';

/**
 * Make all properties in T optional
 * @export
 * @interface PartialRecordOrderModelOrderValidityTypeArray
 */
export interface PartialRecordOrderModelOrderValidityTypeArray {
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    quote?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    fraction?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    savingsPlan?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    market?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    limit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    stopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    stopLimit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    trailingStopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    trailingStopLimit?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    ocoStopMarket?: Array<OrderValidityType>;
    /**
     * 
     * @type {Array<OrderValidityType>}
     * @memberof PartialRecordOrderModelOrderValidityTypeArray
     */
    ocoStopLimit?: Array<OrderValidityType>;
}

export function PartialRecordOrderModelOrderValidityTypeArrayFromJSON(json: any): PartialRecordOrderModelOrderValidityTypeArray {
    return PartialRecordOrderModelOrderValidityTypeArrayFromJSONTyped(json, false);
}

export function PartialRecordOrderModelOrderValidityTypeArrayFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartialRecordOrderModelOrderValidityTypeArray {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'quote': !exists(json, 'quote') ? undefined : ((json['quote'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'fraction': !exists(json, 'fraction') ? undefined : ((json['fraction'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'savingsPlan': !exists(json, 'savingsPlan') ? undefined : ((json['savingsPlan'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'market': !exists(json, 'market') ? undefined : ((json['market'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'limit': !exists(json, 'limit') ? undefined : ((json['limit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'stopMarket': !exists(json, 'stopMarket') ? undefined : ((json['stopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'stopLimit': !exists(json, 'stopLimit') ? undefined : ((json['stopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'trailingStopMarket': !exists(json, 'trailingStopMarket') ? undefined : ((json['trailingStopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'trailingStopLimit': !exists(json, 'trailingStopLimit') ? undefined : ((json['trailingStopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'ocoStopMarket': !exists(json, 'ocoStopMarket') ? undefined : ((json['ocoStopMarket'] as Array<any>).map(OrderValidityTypeFromJSON)),
        'ocoStopLimit': !exists(json, 'ocoStopLimit') ? undefined : ((json['ocoStopLimit'] as Array<any>).map(OrderValidityTypeFromJSON)),
    };
}

export function PartialRecordOrderModelOrderValidityTypeArrayToJSON(value?: PartialRecordOrderModelOrderValidityTypeArray | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'quote': value.quote === undefined ? undefined : ((value.quote as Array<any>).map(OrderValidityTypeToJSON)),
        'fraction': value.fraction === undefined ? undefined : ((value.fraction as Array<any>).map(OrderValidityTypeToJSON)),
        'savingsPlan': value.savingsPlan === undefined ? undefined : ((value.savingsPlan as Array<any>).map(OrderValidityTypeToJSON)),
        'market': value.market === undefined ? undefined : ((value.market as Array<any>).map(OrderValidityTypeToJSON)),
        'limit': value.limit === undefined ? undefined : ((value.limit as Array<any>).map(OrderValidityTypeToJSON)),
        'stopMarket': value.stopMarket === undefined ? undefined : ((value.stopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'stopLimit': value.stopLimit === undefined ? undefined : ((value.stopLimit as Array<any>).map(OrderValidityTypeToJSON)),
        'trailingStopMarket': value.trailingStopMarket === undefined ? undefined : ((value.trailingStopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'trailingStopLimit': value.trailingStopLimit === undefined ? undefined : ((value.trailingStopLimit as Array<any>).map(OrderValidityTypeToJSON)),
        'ocoStopMarket': value.ocoStopMarket === undefined ? undefined : ((value.ocoStopMarket as Array<any>).map(OrderValidityTypeToJSON)),
        'ocoStopLimit': value.ocoStopLimit === undefined ? undefined : ((value.ocoStopLimit as Array<any>).map(OrderValidityTypeToJSON)),
    };
}

